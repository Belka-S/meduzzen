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

import { authReducer } from './auth/authSlice';

// ----------------persistReducer---------------- //

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

// ----------------configureStore---------------- //

const makeStore = () => {
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

export type TRootState = ReturnType<typeof rootReducer>; // without rootReducer -> TRootState = ReturnType<typeof store.getState>;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppDispatch = typeof store.dispatch;

// -----------------persistStore----------------- //

export const persistor = persistStore(store);
