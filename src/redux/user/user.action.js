import axios from 'axios';
import { UserActionTypes } from './user.types';
import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';

const endPoint = 'https://lib-mate.herokuapp.com/';

export const onLoginRequest = (response) => ({
  type: REQUEST(UserActionTypes.ON_LOGIN),
  payload: response,
});
export const onLoginSuccess = (response) => ({
  type: SUCCESS(UserActionTypes.ON_LOGIN),
  payload: response.data,
});
export const onLoginFailuer = (response) => ({
  type: FAILURE(UserActionTypes.ON_LOGIN),
  payload: response.data,
});
export const onSignUpRequest = () => ({
  type: REQUEST(UserActionTypes.ON_SIGNUP),
});
export const onSignUpFailuer = () => ({
  type: FAILURE(UserActionTypes.ON_SIGNUP),
});
export const onSignUpSuccess = () => ({
  type: SUCCESS(UserActionTypes.ON_SIGNUP),
});
export const onLogoutRequest = (err) => ({
  type: REQUEST(UserActionTypes.ON_LOGOUT),
  error: err,
});
export const onLogoutSuccess = (err) => ({
  type: SUCCESS(UserActionTypes.ON_LOGOUT),
  error: err,
});
export const onLogoutFailuer = (err) => ({
  type: FAILURE(UserActionTypes.ON_LOGOUT),
  error: err,
});

export const login = (username, password) => {
  return (dispatch) => {
    const requestUrl = `${endPoint}user`;
    dispatch(onLoginRequest());
    axios
      .get(requestUrl, {
        userName: username,
        password: password,
      })
      .then(
        (response) => {
          console.log('Onlogin : ', response);
          // dispatch(onLoginSuccess(response));
        },
        (err) => {
          dispatch(onLoginFailuer(err));
          console.log('Error : ', err);
        }
      );
  };
};

export const signup = (param) => {
  console.log('On signUp', param);
  return (dispatch) => {
    const requestUrl = `${endPoint}register`;
    dispatch(onSignUpRequest());
    axios.post(requestUrl, param).then(
      (response) => {
        dispatch(onSignUpSuccess(response));
      },
      (err) => {
        dispatch(onSignUpFailuer(err));
      }
    );
  };
};
export const logout = (param) => {
  return (dispatch) => {
    const requestUrl = `${endPoint}`;
    dispatch(onLogoutRequest());
    axios.post(requestUrl, param).then(
      (response) => {
        dispatch(onLogoutSuccess(response));
      },
      (err) => {
        dispatch(onLogoutFailuer(err));
      }
    );
  };
};
