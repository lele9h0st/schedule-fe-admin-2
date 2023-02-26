import authSagas from '../redux/auth/sagas';
import { all } from 'redux-saga/effects';

export default function* IndexSaga() {
    yield all([authSagas()]);
}
