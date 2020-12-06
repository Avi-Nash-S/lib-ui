import { BookstActionTypes } from './books.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
  books: [],
  requestedBook: [],
  book: {},
  pending: false,
  addedBook: false,
  requested: false,
  requestFailed: false,
  updatedRequest: false,
  showfilteredBooks: false,
  filteredBooks: [],
  currentTab: 'All Books',
  failMessage: '',
};

const bookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST(BookstActionTypes.GET_BOOKS):
      return {
        ...state,
        pending: true,
        requestFailed: false,
      };
    case SUCCESS(BookstActionTypes.GET_BOOKS):
      return {
        ...state,
        books: action.payload,
        pending: false,
      };
    case FAILURE(BookstActionTypes.GET_BOOKS):
      return {
        ...state,
        books: [],
        pending: false,
        requestFailed: true,
      };
    case BookstActionTypes.SET_CURRENTTAB:
      return {
        ...state,
        currentTab: action.payload,
      };
    case REQUEST(BookstActionTypes.ADD_BOOK):
      return {
        ...state,
        pending: true,
        addedBook: false,
        requestFailed: false,
      };
    case SUCCESS(BookstActionTypes.ADD_BOOK):
      return {
        ...state,
        book: action.payload,
        pending: false,
        addedBook: true,
      };
    case FAILURE(BookstActionTypes.ADD_BOOK):
      return {
        ...state,
        book: {},
        pending: false,
        requestFailed: true,
      };
    case REQUEST(BookstActionTypes.GET_REQUEST):
      return {
        ...state,
        pending: true,
        requested: false,
        requestFailed: false,
      };
    case SUCCESS(BookstActionTypes.GET_REQUEST):
      return {
        ...state,
        requestedBook: action.payload,
        pending: false,
      };
    case FAILURE(BookstActionTypes.GET_REQUEST):
      return {
        ...state,
        requested: false,
        pending: false,
        requestFailed: true,
      };
    case REQUEST(BookstActionTypes.CREATE_BOOK_REQUEST):
      return {
        ...state,
        pending: true,
        requested: false,
        requestFailed: false,
      };
    case SUCCESS(BookstActionTypes.CREATE_BOOK_REQUEST):
      return {
        ...state,
        requested: true,
        pending: false,
      };
    case FAILURE(BookstActionTypes.CREATE_BOOK_REQUEST):
      return {
        ...state,
        requested: false,
        pending: false,
        requestFailed: true,
        failMessage: 'Request is already present',
      };

    case REQUEST(BookstActionTypes.UPDATE_BOOK_REQUEST):
      return {
        ...state,
        pending: true,
        updatedRequest: false,
      };
    case SUCCESS(BookstActionTypes.UPDATE_BOOK_REQUEST):
      return {
        ...state,
        updatedRequest: true,
        pending: false,
      };
    case FAILURE(BookstActionTypes.UPDATE_BOOK_REQUEST):
      return {
        ...state,
        updatedRequest: false,
        pending: false,
      };
    case BookstActionTypes.FILTER_BOOK_REQUEST:
      let tempBooks = state.books;
      var matchingObj =
        tempBooks &&
        tempBooks.filter(
          (obj) =>
            obj.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            obj.author.toLowerCase().includes(action.payload.toLowerCase()) ||
            obj.isbn.toLowerCase().includes(action.payload.toLowerCase()) ||
            obj.publisher.toLowerCase().includes(action.payload.toLowerCase())
        );
      return {
        ...state,
        filteredBooks: matchingObj,
        showfilteredBooks: true,
      };
    case BookstActionTypes.RESET_FILTERED_RESULT:
      return {
        ...state,
        showfilteredBooks: false,
        filteredBooks: [],
      };
    default:
      return state;
  }
};

export default bookReducer;
