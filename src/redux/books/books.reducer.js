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
        // requested: true,
        pending: false,
      };
    case FAILURE(BookstActionTypes.GET_REQUEST):
      return {
        ...state,
        requested: false,
        pending: false,
        requestFailed: true,
        // failMessage: action.payload.message,
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
        // requestedBook: action.payload,
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
    default:
      return state;
  }
};

export default bookReducer;
