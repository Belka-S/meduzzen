import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { companyReducer } from './company/companySlice';
import { actionReducer } from './action';
import { authReducer } from './auth';
import { companyDataReducer } from './companyData';
import { commonReducer } from './server';
import { usersReducer } from './user';
import { userDataReducer } from './userData';

// ----------------persistReducer---------------- //

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const rootReducer = combineReducers({
  common: commonReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  users: usersReducer,
  companies: companyReducer,
  actions: actionReducer,
  userData: userDataReducer,
  companyData: companyDataReducer,
});

// ----------------configureStore---------------- //

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = makeStore();

// -----------------persistStore----------------- //

export const persistor = persistStore(store);
