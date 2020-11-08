import { FormsActionType } from './forms.types';
import { SUCCESS } from '../action-type.util';
import { SubmissionError } from 'redux-form'
import store from '../store';

const signUpFormSuccess = obj => ({
    type: SUCCESS(FormsActionType.SUBMIT_FORM),
    payload: obj
})

const signInFormSuccess = value => ({
    type: SUCCESS(FormsActionType.LOGIN_FORM),
    payload: value.email
})

const logoutSuccess = () => ({
    type: SUCCESS(FormsActionType.LOGOUT_FORM),
    payload: null
})


export const onSignUpSubmit = (value) => async dispatch => {
    const userDb = store.store.getState().data.userDB;
    const obj = {
        [value.email]: value.password
    };
    if (!userDb || (userDb && !userDb.hasOwnProperty(value.email))) {
        dispatch(signUpFormSuccess(obj))
    } else {
        throw new SubmissionError({ _error: 'User Already exists' })
    }
};

export const onSignInSubmit = (value) => async dispatch => {
    // workaround -> redux saga to be implemented
    const userDb = store.store.getState().data.userDB;
    if (userDb && userDb.hasOwnProperty(value.email) && value.password === userDb[value.email]) {
        dispatch(signInFormSuccess(value))
    } else if (userDb && userDb.hasOwnProperty(value.email)) {
        throw new SubmissionError({ _error: 'Password does not Match' })
    } else {
        throw new SubmissionError({ _error: 'User does not exist' })
    }
}

export const logoutUser = () => async dispatch => {
    dispatch(logoutSuccess())
}
