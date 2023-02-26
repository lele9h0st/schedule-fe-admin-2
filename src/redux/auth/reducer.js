import {
    LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    RESET_MESSAGE,
} from './constants';

const initialState = {
    user: null,
    token: null,
    loading: false,
    message: null,
    error: null,
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload.user, message: null, error: null };
        case LOADING:
            return { ...state, loading: true, error: null, message: null };
        case LOGIN_FAIL:
            console.log(state);
            return { ...state, loading:false };
        case LOGOUT:
            localStorage.removeItem('token');
            return { ...state, loading: false, user: null };
        case RESET_MESSAGE:
            return { ...state, loading: false, error: null, message: null };
        default:
            return state;
    }
}

export default authReducer;
