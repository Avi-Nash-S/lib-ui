import { FormsActionType } from './forms.types';
import { SUCCESS } from '../action-type.util';

const INITIAL_STATE = {
    userDB: null,
    loggedIn: null
};

const formsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUCCESS(FormsActionType.SUBMIT_FORM):
            return {
                ...state,
                userDB: Object.assign(action.payload, state.userDB)
            };
        case SUCCESS(FormsActionType.LOGIN_FORM):
            return {
                ...state,
                loggedIn: action.payload
            }
        case SUCCESS(FormsActionType.LOGOUT_FORM):
            return {
                ...state,
                loggedIn: action.payload
            }
        default:
            return state;
    }
};

export default formsReducer;
