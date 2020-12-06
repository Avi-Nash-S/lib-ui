import axios from 'axios';
import { UserActionTypes } from './user.types';
import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';

const endPoint = 'https://lib-mate.herokuapp.com/users/';

export const onLoginRequest = (response) => ({
  type: REQUEST(UserActionTypes.ON_LOGIN),
  payload: response,
});
export const onLoginSuccess = (response) => ({
  type: SUCCESS(UserActionTypes.ON_LOGIN),
  payload: response.data,
});
export const onGetUserSuccess = (response) => ({
  type: SUCCESS(UserActionTypes.GET_USER),
  payload: response.data,
});
export const onGetUserFailuer = (response) => ({
  type: FAILURE(UserActionTypes.GET_USER),
  payload: response.data,
});
export const onLoginFailuer = (response) => ({
  type: FAILURE(UserActionTypes.ON_LOGIN),
  payload: response.data,
});

export const onSignUpRequest = () => ({
  type: REQUEST(UserActionTypes.ON_SIGNUP),
});
export const onSignUpFailuer = (error) => ({
  type: FAILURE(UserActionTypes.ON_SIGNUP),
  payload: error,
});
export const onSignUpSuccess = (response) => ({
  type: SUCCESS(UserActionTypes.ON_SIGNUP),
  payload: response.data,
});

export const onLogoutRequest = () => ({
  type: REQUEST(UserActionTypes.ON_LOGOUT),
  payload: {},
});
export const onLogoutSuccess = (err) => ({
  type: SUCCESS(UserActionTypes.ON_LOGOUT),
  payload: {},
});
export const onLogoutFailuer = (err) => ({
  type: FAILURE(UserActionTypes.ON_LOGOUT),
  payload: err,
});

export const login = (username, password) => {
  return (dispatch) => {
    const requestUrl = `${endPoint}login`;
    dispatch(onLoginRequest());
    axios
      .post(requestUrl, {
        userName: username,
        password: password,
      })
      .then(
        (response) => {
          dispatch(onLoginSuccess(response));
          dispatch(getUserDetails(response.data._id));
        },
        (err) => {
          dispatch(onLoginFailuer(err));
        }
      );
  };
};
const getUserDetails = (id) => {
  return (dispatch) => {
    const requestUrl = `${endPoint}${id}`;
    axios.get(requestUrl).then(
      (response) => {
        dispatch(onGetUserSuccess(response));
      },
      (err) => {
        dispatch(onGetUserFailuer(err));
      }
    );
  };
};
export const signup = (param) => {
  return (dispatch) => {
    const requestUrl = `${endPoint}register`;
    dispatch(onSignUpRequest());
    axios.post(requestUrl, param).then(
      (response) => {
        dispatch(onSignUpSuccess(response));
        dispatch(getUserDetails(response.data._id));
      },
      (err) => {
        dispatch(onSignUpFailuer(err));
      }
    );
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch(onLogoutSuccess());
  };
};
