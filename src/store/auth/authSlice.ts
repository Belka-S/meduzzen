import * as TNK from 'store/auth/authThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { TUserInitialState, userInitialState } from './initialState';

const thunkArr = [
  TNK.registerThunk,
  TNK.loginThunk,
  TNK.logoutThunk,

  TNK.verifyEmailThunk,
  TNK.forgotPassThunk,
  TNK.resetPassThunk,

  TNK.refreshUserThunk,
  TNK.updateUserThunk,
  TNK.deleteUserThunk,
];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleLoginSucsess = (
  _: TUserInitialState,
  action: PayloadAction<{ result: { user: TUserInitialState } }>,
) => action.payload.result.user;

const handleLogoutSucsess = () => userInitialState;

const handleAuthSucsess = (
  state: TUserInitialState,
  action: PayloadAction<{ result: { user: TUserInitialState } }>,
) => {
  const { accessToken, refreshToken } = action.payload.result.user;
  return { ...state, accessToken, refreshToken };
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
      .addCase(TNK.loginThunk.fulfilled, handleLoginSucsess)
      .addCase(TNK.logoutThunk.fulfilled, handleLogoutSucsess)
      // auth from localStorage
      .addCase(TNK.refreshUserThunk.fulfilled, handleLoginSucsess)
      // verify email
      .addCase(TNK.verifyEmailThunk.fulfilled, handleLoginSucsess)
      // reset password
      .addCase(TNK.forgotPassThunk.fulfilled, handleLogoutSucsess)
      .addCase(TNK.resetPassThunk.fulfilled, handleLogoutSucsess)
      // update profile
      .addCase(TNK.updateUserThunk.fulfilled, handleLoginSucsess)
      .addCase(TNK.deleteUserThunk.fulfilled, handleLogoutSucsess);
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
