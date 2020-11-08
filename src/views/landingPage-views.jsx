import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../redux/books/books.action';
import '../view-styles/landingPage-styles.scss';
import CardListComponent from '../components/cardList-component';
import LandingPageLayout from '../components/landingPage-layout-component';

class landingPageViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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

  render() {
    const { history } = this.props;
    const { books } = this.state;
    return (
      <LandingPageLayout history={history}>
        <CardListComponent books={books} isLoading={false} history={history} currentTab={this.props.data.currentTab} />
      </LandingPageLayout>
    );
  }
}

const mapStateToProps = (storeState) => ({
  data: storeState.books,
});

const mapDispatchToProps = (dispatch) => ({
  getBooks: (pageNo, pageSize, query) => dispatch(getBooks(pageNo, pageSize, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(landingPageViews);
