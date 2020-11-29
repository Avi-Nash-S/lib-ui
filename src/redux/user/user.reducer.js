import { UserActionTypes } from './user.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem('User')) || '',
  loading: false,
  loginError: false,
  accessToken: JSON.parse(localStorage.getItem('accessToken')) || '',
  userId: undefined,
  currentTab: 'All Books',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST(UserActionTypes.ON_LOGIN):
      return {
        ...state,
        loading: true,
        loginError: false,
      };
    case SUCCESS(UserActionTypes.ON_LOGIN):
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userId: action.payload._id,
      };
    case FAILURE(UserActionTypes.ON_LOGIN):
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case SUCCESS(UserActionTypes.GET_USER):
      sessionStorage.setItem('User', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case FAILURE(UserActionTypes.GET_USER):
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case REQUEST(UserActionTypes.ON_SIGNUP):
      return {
        ...state,
        loading: true,
        loginError: false,
      };
    case SUCCESS(UserActionTypes.ON_SIGNUP):
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userId: action.payload._id,
      };
    case FAILURE(UserActionTypes.ON_SIGNUP):
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    default:
      return state;
  }
};

export default userReducer;
