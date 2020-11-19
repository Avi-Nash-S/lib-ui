import { UserActionTypes } from './user.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
  user: undefined,
  loading: false,
  loginError: false,
  accessToken: undefined,
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
      console.logh('User Created :', action.payload);
      return {
        ...state,
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
