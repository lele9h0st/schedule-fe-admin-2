import { call, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    LOADING,
    GET_USER,
} from './constants';
import {
    loginService,
    getUserService,
} from './services';

import { NotificationManager } from 'react-notifications';


// import history from '~/utils/history';
// import RootNavigate from '~/utils/navigate';

function* loginSaga(action) {
    const { email, password } = action.payload;
    console.log('login: ', email, '|', password);
    yield put({ type: LOGIN_FAIL });
    try {
        yield put({ type: LOADING });
        const response = yield call(loginService, email, password);
        console.log(response.data);
        if (response.status == 1) {
            // lưu token
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('tokenExpDate', response.data.tokenExpDate);


            // lấy thông tin user
            const user = yield call(getUserService);
            yield put({ type: LOGIN_SUCCESS, payload: { user: user.data } });
            console.log(user);

            // RootNavigate.getNavigate()('/');
        } else {
            NotificationManager.error(response.message);
            yield put({ type: LOGIN_FAIL, payload: { error: response.message ? response.message : "Vui lòng thử lại" } });
        }
    } catch (error) {
        NotificationManager.error("Server is starting");
        yield put({ type: LOGIN_FAIL, payload: { error: "Server not working" } });
    }
}

function* getUserInfoSaga() {
    try {
        // lấy thông tin user
        const user = yield call(getUserService);
        if (user) {
            yield put({ type: LOGIN_SUCCESS, payload: { user: user.data } });
        }
    } catch (error) { }
}


function* authSagas() {
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(GET_USER, getUserInfoSaga);
}

export default authSagas;
