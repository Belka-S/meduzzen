import * as TNK from 'store/auth/authThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { TUser, userInitialState } from './initialState';

const thunkArr = [TNK.authThunk, TNK.loginThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleAuthSucsess = (
  state: TUser,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, ...action.payload.result });

// const handleLoginSucsess = (
//   _: TUser,
//   action: PayloadAction<{ result: { user: TUser } }>,
// ) => action.payload.result.user;

// auth
const authUserSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logout: () => userInitialState,
  },
  extraReducers: builder => {
    builder
      // auth
      .addCase(TNK.authThunk.fulfilled, handleAuthSucsess)
      .addCase(TNK.loginThunk.fulfilled, handleAuthSucsess);
    // .addCase(TNK.registerThunk.fulfilled, handleLoginSucsess)
  },
});

// loading slice
const authLoadingSlice = createSlice({
  name: 'Loading',
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

export const { logout } = authUserSlice.actions;
