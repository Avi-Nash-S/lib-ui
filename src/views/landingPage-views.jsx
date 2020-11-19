import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, addBook } from '../redux/books/books.action';
import '../view-styles/landingPage-styles.scss';
import CardListComponent from '../components/cardList-component';
import LandingPageLayout from '../components/landingPage-layout-component';
import Button from '@material-ui/core/Button';
import AddBook from '../components/addBookForm';
class landingPageViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      openAddBook: false,
    };
  }
  componentDidMount() {
    const { data, getBooks } = this.props;
    if (Array.isArray(data.books) && data.books.length) {
      this.setState({
        books: data.books,
      });
    } else {
      getBooks();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        books: this.props.data.books,
      });
    }
  }
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
    this.props.getBooks();
    this.setState({ openAddBook: false });
  };
  render() {
    const { history } = this.props;
    const { books, openAddBook } = this.state;
    console.log(books);
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
          books={books}
          isLoading={false}
          history={history}
          currentTab={this.props.data.currentTab}
          userData={this.props.userData.user}
        />
        <AddBook openAddBook={openAddBook} handleClose={this.handleClose} handleAddBook={this.handleAddBook} />
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
