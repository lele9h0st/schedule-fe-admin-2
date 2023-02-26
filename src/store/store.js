import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import IndexReducer from './reducers';
import IndexSagas from './sagas';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(IndexReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(IndexSagas);

export default store;