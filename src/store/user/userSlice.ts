import { toast } from 'react-toastify';
import { TUser } from 'store/user/initialState';
import * as TNK from 'store/user/userThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  paginationInitialState,
  TPagination,
  userInitialState,
  usersInitialState,
} from './initialState';

const thunkArr = [
  TNK.getAllUsersThunk,
  TNK.getUserThunk,
  TNK.updateUserInfoThunk,
  TNK.updatePasswordThunk,
  TNK.updateAvatarThunk,
  TNK.deleteUserThunk,
];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice

// users
const handleGetAllUsersSucsess = (
  state: TUser[],
  action: PayloadAction<{ result: { users: TUser[] } }>,
) => state.concat(action.payload.result.users);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(TNK.getAllUsersThunk.fulfilled, handleGetAllUsersSucsess);
  },
});

// pagination
const handlePaginationSucsess = (
  _: TPagination,
  action: PayloadAction<{ result: { pagination: TPagination } }>,
) => action.payload.result.pagination;

const paginationSlice = createSlice({
  name: 'users/pagination',
  initialState: paginationInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(TNK.getAllUsersThunk.fulfilled, handlePaginationSucsess);
  },
});

// active
const handleGetUserSucsess = (
  state: Partial<TUser>,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, ...action.payload.result });

const handleUpdateActiveUserSucsess = (
  state: Partial<TUser>,
  action: PayloadAction<Partial<TUser>>,
) => ({ ...state, ...action.payload });

const handleUpdateSucsess = () => {
  toast.success('Updated');
};
const handleDeleteSucsess = () => {
  toast.success('Deleted');
};

const activeUserSlice = createSlice({
  name: 'users/active',
  initialState: userInitialState,
  reducers: {
    editActiveUser: handleUpdateActiveUserSucsess,
  },
  extraReducers: builder => {
    builder
      .addCase(TNK.getUserThunk.fulfilled, handleGetUserSucsess)
      .addCase(TNK.updateUserInfoThunk.fulfilled, handleUpdateActiveUserSucsess)
      .addCase(TNK.updatePasswordThunk.fulfilled, handleUpdateSucsess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleUpdateSucsess)
      .addCase(TNK.deleteUserThunk.fulfilled, handleDeleteSucsess);
  },
});

// loading slice
const usersLoadingSlice = createSlice({
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
const usersErrorSlice = createSlice({
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

export const usersReducer = combineReducers({
  userList: usersSlice.reducer,
  pagination: paginationSlice.reducer,
  active: activeUserSlice.reducer,
  loading: usersLoadingSlice.reducer,
  error: usersErrorSlice.reducer,
});

export const { editActiveUser } = activeUserSlice.actions;
