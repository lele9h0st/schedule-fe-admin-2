import { combineReducers } from 'redux';
import common from '../redux/common/reducer';
import authReducer from '../redux/auth/reducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootPersistConfig = {
   key: 'root',
   storage: storage,
   blacklist: ['navigation'],
};

const authPersistConfig = {
   key: 'authReducer',
   storage: storage,
};

const rootReducer = combineReducers({
   authReducer: persistReducer(authPersistConfig, authReducer),
   common
});

export default persistReducer(rootPersistConfig, rootReducer);