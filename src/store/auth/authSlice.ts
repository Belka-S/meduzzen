import * as TNK from 'store/auth/authThunks';
import { TUser, userInitialState } from 'store/user';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

const thunkArr = [TNK.authThunk, TNK.loginThunk, TNK.registerThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleAuthSucsess = (
  state: Partial<TUser>,
  action: PayloadAction<{ result: Partial<TUser> }>,
) => {
  return { ...state, ...action.payload.result };
};

const authUserSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: handleAuthSucsess,
    logout: () => userInitialState,
  },
  extraReducers: builder => {
    builder
      .addCase(TNK.authThunk.fulfilled, handleAuthSucsess)
      .addCase(TNK.loginThunk.fulfilled, handleAuthSucsess)
      .addCase(TNK.registerThunk.fulfilled, handleAuthSucsess);
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
  user: authUserSlice.reducer,
  loading: authLoadingSlice.reducer,
  error: authErrorSlice.reducer,
});

export const { login, logout } = authUserSlice.actions;
