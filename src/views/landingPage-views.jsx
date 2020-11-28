import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, addBook } from '../redux/books/books.action';
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
      openAddBook: false,
      showSuccessNotification: false,
      message: '',
      accessToken: undefined,
      openBookdetails: false,
      book: undefined,
    };
  }
  componentDidMount() {
    const { data, getBooks, userData } = this.props;
    if (Array.isArray(data.books) && data.books.length) {
      this.setState({
        books: data.books,
      });
    } else {
      getBooks();
    }
    if (userData.user) {
      localStorage.setItem('accessToken', userData.accessToken);
    }
    const accessToken = localStorage.getItem('accessToken');
    this.setState({
      accessToken: accessToken,
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data.addedBook !== data.addedBook && data.addedBook) {
      this.setState({
        showSuccessNotification: true,
        message: 'Book Added Successfully',
      });
      setTimeout(() => {
        this.handleSnackbarClose();
      }, 6000);
    }
  }
  handleSnackbarClose = () => {
    this.setState({
      showSuccessNotification: false,
      message: '',
    });
  };
  handleAddBookBtnClick = () => {
    this.setState({
      openAddBook: true,
    });
  };

  handleClose = () => {
    this.setState({
      openAddBook: false,
    });
  };
  handleAddBook = (param) => {
    param['ownerId'] = this.props.userData.user._id;
    this.props.addBook(param);
    this.setState({ openAddBook: false });
  };
  openBookDetails = (book) => {
    this.setState({
      openBookdetails: true,
      book: book,
    });
  };
  onBookdetailsModalClose = () => {
    this.setState({
      openBookdetails: false,
      book: undefined,
    });
  };
  render() {
    const { history, data } = this.props;
    const { openAddBook, showSuccessNotification, message, openBookdetails, book } = this.state;
    return (
      <LandingPageLayout history={history}>
        {this.props.data.currentTab === 'Your Books' && this.props.userData.user && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' color='primary' onClick={this.handleAddBookBtnClick}>
              Add Book
            </Button>
          </div>
        )}
        <CardListComponent
          books={data.books}
          isLoading={false}
          history={history}
          currentTab={this.props.data.currentTab}
          userData={this.props.userData.user}
          onBookImageClick={this.openBookDetails}
        />
        <AddBook
          openAddBook={openAddBook}
          handleClose={this.handleClose}
          handleAddBook={this.handleAddBook}
          loading={data.pending}
        />
        {openBookdetails && (
          <BookDetails openBookDetail={openBookdetails} book={book} onclose={this.onBookdetailsModalClose} />
        )}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={showSuccessNotification}
            // autoHideDuration={6000}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(landingPageViews);
