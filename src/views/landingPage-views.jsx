import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, addBook, getBookRequests, requestBook, updateBookRequest } from '../redux/books/books.action';
import '../view-styles/landingPage-styles.scss';
import CardListComponent from '../components/cardList-component';
import LandingPageLayout from '../components/landingPage-layout-component';
import Button from '@material-ui/core/Button';
import AddBook from '../components/addBookForm';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BookDetails from '../components/bookDetails';

class landingPageViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddBook: false, // Opens modal box to add a new book
      showSuccessNotification: false, // shows notification
      message: '', //message to show
      accessToken: undefined, // to authenticate the api requests
      openBookdetails: false, // displays the details page of the book on click of book image
      book: undefined, // selected book to show its details in details page
      requestDetails: undefined, // details of selected requests
      requestedBook: false, // details of the book which is requested
      requestId: undefined, // request id
    };
  }
  // called when the page is loaded
  componentDidMount() {
    const { data, getBooks, getBookRequests } = this.props;
    // check if book exists and add to books array or call get book api
    if (Array.isArray(data.books) && data.books.length) {
      this.setState({
        books: data.books,
      });
    } else {
      getBooks();
    }
    // get access token from local storage
    this.setState({
      accessToken: JSON.parse(localStorage.getItem('accessToken')),
    });
    // get all the book requests
    getBookRequests();
  }

  // called when component updates
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    // show notification when added a new book
    if (prevProps.data.addedBook !== data.addedBook && data.addedBook) {
      this.setState({
        showSuccessNotification: true,
        message: 'Book Added Successfully',
      });
      setTimeout(() => {
        this.handleSnackbarClose();
      }, 6000);
    }
    // show notification when requesting a book
    if (prevProps.data.requested !== data.requested && data.requested) {
      this.setState({
        showSuccessNotification: true,
        openBookdetails: false,
        message: 'Book Requested Successfully',
      });
      setTimeout(() => {
        this.handleSnackbarClose();
      }, 6000);
    }
    // show notification when updating a request
    if (prevProps.data.updatedRequest !== data.updatedRequest && data.updatedRequest) {
      this.setState({
        showSuccessNotification: true,
        openBookdetails: false,
        message: 'Book Requested Updated Successfully',
      });
      setTimeout(() => {
        this.handleSnackbarClose();
      }, 6000);
    }
    // show notification when api fails
    if (prevProps.data.requestFailed !== data.requestFailed && data.requestFailed) {
      this.setState({
        showSuccessNotification: true,
        message: data.failMessage,
      });
      setTimeout(() => {
        this.handleSnackbarClose();
      }, 6000);
    }
  }
  // on close of notification snack bar
  handleSnackbarClose = () => {
    this.setState({
      showSuccessNotification: false,
      message: '',
    });
  };

  // onclick of add book button
  handleAddBookBtnClick = () => {
    this.setState({
      openAddBook: true,
    });
  };

  // onclose of opened add book modal box
  handleClose = () => {
    this.setState({
      openAddBook: false,
    });
  };
  // on click of add book from add book modal box to add a new book
  handleAddBook = (param) => {
    param['ownerId'] = this.props.userData.user._id;
    this.props.addBook(param);
    this.setState({ openAddBook: false });
  };

  // openes book details page
  openBookDetails = (book, RequestedBook, requestId) => {
    this.setState({
      openBookdetails: true,
      book: book,
      RequestId: requestId,
      RequestedBook,
    });
  };
  // onclose of details page
  onBookdetailsModalClose = () => {
    this.setState({
      openBookdetails: false,
      book: undefined,
    });
  };
  // on request of a book
  onBookRequest = (book) => {
    this.props.requestBook({ bookId: book._id });
  };
  // on update of book request
  onBookRequestUpdate = (id, action) => {
    this.props.updateBookRequest(id, action);
  };

  render() {
    const { history, data } = this.props;
    const {
      openAddBook,
      showSuccessNotification,
      message,
      openBookdetails,
      book,
      RequestedBook,
      RequestId,
    } = this.state;
    return (
      <LandingPageLayout history={history}>
        {this.props.data.currentTab === 'Your Books' && this.props.userData.user && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' color='primary' onClick={this.handleAddBookBtnClick}>
              Add Book
            </Button>
          </div>
        )}
        {data.showfilteredBooks ? (
          <CardListComponent
            books={data.filteredBooks}
            requestedBooks={data.requestedBook}
            isLoading={false}
            history={history}
            currentTab={data.currentTab}
            userData={this.props.userData.user}
            onBookImageClick={this.openBookDetails}
          />
        ) : (
          <CardListComponent
            books={data.books}
            requestedBooks={data.requestedBook}
            isLoading={false}
            history={history}
            currentTab={data.currentTab}
            userData={this.props.userData.user}
            onBookImageClick={this.openBookDetails}
          />
        )}

        <AddBook
          openAddBook={openAddBook}
          handleClose={this.handleClose}
          handleAddBook={this.handleAddBook}
          loading={data.pending}
        />
        {openBookdetails && (
          <BookDetails
            currentTab={data.currentTab}
            userData={this.props.userData.user}
            book={book}
            RequestedBook={RequestedBook}
            requestedBooks={data.requestedBook}
            requestId={RequestId}
            onclose={this.onBookdetailsModalClose}
            onBookRequest={this.onBookRequest}
            onBookRequestUpdate={this.onBookRequestUpdate}
          />
        )}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={showSuccessNotification}
            onClose={this.handleSnackbarClose}
            onBlur={this.handleSnackbarClose}
            message={message}
            action={
              <React.Fragment>
                <IconButton size='small' aria-label='close' color='inherit' onClick={this.handleSnackbarClose}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </LandingPageLayout>
    );
  }
}

const mapStateToProps = (storeState) => ({
  data: storeState.books,
  userData: storeState.user,
});

const mapDispatchToProps = (dispatch) => ({
  getBooks: (pageNo, pageSize, query) => dispatch(getBooks(pageNo, pageSize, query)),
  addBook: (param) => dispatch(addBook(param)),
  getBookRequests: () => dispatch(getBookRequests()),
  requestBook: (param) => dispatch(requestBook(param)),
  updateBookRequest: (id, action) => dispatch(updateBookRequest(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(landingPageViews);
