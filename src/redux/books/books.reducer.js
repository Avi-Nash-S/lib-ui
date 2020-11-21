import { BookstActionTypes } from './books.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
  books: [],
  book: {},
  pending: false,
  addedBook: false,
  currentTab: 'All Books',
};

const bookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST(BookstActionTypes.GET_BOOKS):
      return {
        ...state,
        pending: true,
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
      };
    default:
      return state;
  }
};

export default bookReducer;
