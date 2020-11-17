import { UserActionTypes } from './user.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
  user: {},
  loading: false,
  loginError: false,
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
      };
    case FAILURE(UserActionTypes.ON_LOGIN):
      console.log('Reached');
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case REQUEST(REQUEST(UserActionTypes.ON_SIGNUP)):
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
