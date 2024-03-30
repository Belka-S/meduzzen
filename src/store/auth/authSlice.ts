import { TAuth } from 'store';
import * as TNK from 'store/auth/authThunks';
import { initialState } from 'store/auth/inititalState';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

const thunkArr = [TNK.loginThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleLoginSuccess = (
  state: TAuth,
  action: PayloadAction<{ result: TAuth }>,
) => {
  return { ...state, ...action.payload.result };
};

// auth
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: handleLoginSuccess,
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(TNK.loginThunk.fulfilled, handleLoginSuccess);
  },
});

// loading slice
const authLoadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => true)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), () => false);
  },
});

// error slice
const authErrorSlice = createSlice({
  name: 'error',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => false)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), (_, action) => action.payload);
  },
});

export const authReducer = combineReducers({
  token: authSlice.reducer,
  loading: authLoadingSlice.reducer,
  error: authErrorSlice.reducer,
});

export const { login, logout } = authSlice.actions;
