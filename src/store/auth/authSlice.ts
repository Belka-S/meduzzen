import * as TNK from 'store/auth/authThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { TUserInitialState, userInitialState } from './initialState';

const thunkArr = [TNK.registerThunk, TNK.loginThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    switch (type) {
      case 'pending':
        return el.pending;
      case 'rejected':
        return el.rejected;
      default:
        return el.fulfilled;
    }
  });

// fulfilled slice
const handleLoginSucsess = (
  _: TUserInitialState,
  action: PayloadAction<{ result: { user: TUserInitialState } }>,
) => action.payload.result.user;

const handleAuthSucsess = (
  state: TUserInitialState,
  action: PayloadAction<{ result: { user: TUserInitialState } }>,
) => {
  const { accessToken } = action.payload.result.user;
  return { ...state, accessToken };
};
// auth
const authUserSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    authenticate: handleAuthSucsess,
  },
  extraReducers: builder => {
    builder
      // auth
      .addCase(TNK.registerThunk.fulfilled, handleLoginSucsess)
      .addCase(TNK.loginThunk.fulfilled, handleLoginSucsess);
  },
});

// loading slice
const authIsLoadingSlice = createSlice({
  name: 'isLoading',
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
  isLoading: authIsLoadingSlice.reducer,
  error: authErrorSlice.reducer,
});

export const { authenticate } = authUserSlice.actions;
