import { BookstActionTypes } from './books.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
  books: [],
  pending: false,
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
    default:
      return state;
  }
};

export default bookReducer;
