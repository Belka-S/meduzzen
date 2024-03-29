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
import { authReducer } from './auth';
import { commonReducer } from './server';
import { usersReducer } from './user';

// ----------------persistReducer---------------- //

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const usersPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['owner'],
};

export const rootReducer = combineReducers({
  common: commonReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  companies: companyReducer,
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
