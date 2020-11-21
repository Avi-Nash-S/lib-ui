import axios from 'axios';
import { BookstActionTypes } from './books.types';
import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';

const endPoint = 'https://lib-mate.herokuapp.com/books/';

export const getBooksSuccess = (response) => ({
  type: SUCCESS(BookstActionTypes.GET_BOOKS),
  payload: response.data,
});

export const getBooksRequest = () => ({
  type: REQUEST(BookstActionTypes.GET_BOOKS),
});

export const getBooksFailure = (err) => ({
  type: FAILURE(BookstActionTypes.GET_BOOKS),
  error: err,
});
export const setCurrentTab = (currentTab) => ({
  type: BookstActionTypes.SET_CURRENTTAB,
  payload: currentTab,
});

export const getBooks = () => {
  return (dispatch) => {
    const requestUrl = `${endPoint}`;
    dispatch(getBooksRequest());
    axios.get(requestUrl).then(
      (response) => {
        dispatch(getBooksSuccess(response));
      },
      (err) => {
        dispatch(getBooksFailure(err));
      }
    );
  };
};

export const addBookSuccess = (response) => ({
  type: SUCCESS(BookstActionTypes.ADD_BOOK),
  payload: response.data,
});

export const addBookRequest = () => ({
  type: REQUEST(BookstActionTypes.ADD_BOOK),
});

export const addBookFailure = (err) => ({
  type: FAILURE(BookstActionTypes.ADD_BOOK),
  error: err,
});
export const addBook = (param) => {
  return (dispatch) => {
    const requestUrl = `${endPoint}`;
    dispatch(addBookRequest());
    axios.post(requestUrl, param).then(
      (response) => {
        dispatch(addBookSuccess(response));
        dispatch(getBooks());
      },
      (err) => {
        dispatch(addBookFailure(err));
      }
    );
  };
};
