import { TUser } from 'store/auth/initialState';
import * as TNK from 'store/user/userThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { userLisInitialState } from './initialState';

const thunkArr = [TNK.registerThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleRegisterSucsess = (
  state: TUser[],
  action: PayloadAction<{ result: Partial<TUser> }>,
) => ({ ...state, ...action.payload.result });

const userListSlice = createSlice({
  name: 'userList',
  initialState: userLisInitialState,
  reducers: {
    logout: () => userLisInitialState,
  },
  extraReducers: builder => {
    builder.addCase(TNK.registerThunk.fulfilled, handleRegisterSucsess);
  },
});

// loading slice
const userListLoadingSlice = createSlice({
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
const userListErrorSlice = createSlice({
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

export const userListReducer = combineReducers({
  userList: userListSlice.reducer,
  loading: userListLoadingSlice.reducer,
  error: userListErrorSlice.reducer,
});

export const { logout } = userListSlice.actions;
