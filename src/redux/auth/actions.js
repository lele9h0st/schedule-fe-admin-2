import {
    FORGOT_PASSWORD,
    GET_USER,
    LOGIN,
    LOGOUT,
    RESET_MESSAGE,
    SIGNUP,
    UPDATE_INFO_USER,
    UPDATE_PASSWORD,
    LOGIN_GOOGLE,
} from './constants';

export function login(email, password) {
    return {
        type: LOGIN,
        payload: { email, password },
    };
}

export function getUserInfo() {
    return {
        type: GET_USER,
    };
}

export function reset() {
    return {
        type: RESET_MESSAGE,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
