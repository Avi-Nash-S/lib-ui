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

export const getBookRequests = () => {
  return (dispatch) => {
    const requestUrl = `https://lib-mate.herokuapp.com/requests`;
    dispatch(getBookRequest());
    axios.get(requestUrl).then(
      (response) => {
        dispatch(getBookRequestSuccess(response));
      },
      (err) => {
        dispatch(getBookRequestFailure(err));
      }
    );
  };
};

const getBookRequest = () => ({
  type: REQUEST(BookstActionTypes.GET_REQUEST),
  payload: {},
});

const getBookRequestSuccess = (response) => ({
  type: SUCCESS(BookstActionTypes.GET_REQUEST),
  payload: response.data,
});

const getBookRequestFailure = (response) => ({
  type: FAILURE(BookstActionTypes.GET_REQUEST),
  payload: response.data,
});

export const requestBook = (param) => {
  return (dispatch) => {
    const requestUrl = `https://lib-mate.herokuapp.com/requests/create`;
    dispatch(createBookRequest());
    axios
      .post(requestUrl, param, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then(
        (response) => {
          dispatch(requestBookSuccess(response));
          dispatch(getBookRequests());
        },
        (err) => {
          dispatch(requestBookFailure(err));
        }
      );
  };
};

const createBookRequest = () => ({
  type: REQUEST(BookstActionTypes.CREATE_BOOK_REQUEST),
  payload: {},
});

const requestBookSuccess = (response) => ({
  type: SUCCESS(BookstActionTypes.CREATE_BOOK_REQUEST),
  payload: response.data,
});

const requestBookFailure = (response) => ({
  type: FAILURE(BookstActionTypes.CREATE_BOOK_REQUEST),
  payload: response.data,
});

export const updateBookRequest = (id, action) => {
  return (dispatch) => {
    const requestUrl = `https://lib-mate.herokuapp.com/requests/${action}/${id}`;
    dispatch(updateRequest());
    axios
      .patch(requestUrl, id, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('accessToken')),
        },
      })
      .then(
        (response) => {
          dispatch(updateRequestSuccess(response));
          dispatch(getBookRequests());
          dispatch(getBooks());
        },
        (err) => {
          dispatch(updateRequestFailure(err));
        }
      );
  };
};

const updateRequest = () => ({
  type: REQUEST(BookstActionTypes.UPDATE_BOOK_REQUEST),
  payload: {},
});

const updateRequestSuccess = (response) => ({
  type: SUCCESS(BookstActionTypes.UPDATE_BOOK_REQUEST),
  payload: response.data,
});

const updateRequestFailure = (response) => ({
  type: FAILURE(BookstActionTypes.UPDATE_BOOK_REQUEST),
  payload: response.data,
});

export const filterBooks = (searchQuery) => {
  return (dispatch) => {
    dispatch(filterBooksResults(searchQuery));
  };
};

const filterBooksResults = (searchQuery) => ({
  type: BookstActionTypes.FILTER_BOOK_REQUEST,
  payload: searchQuery,
});
export const resetBooksResults = () => ({
  type: BookstActionTypes.RESET_FILTERED_RESULT,
  payload: {},
});
