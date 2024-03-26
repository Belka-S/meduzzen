import { toast } from 'react-toastify';
import {
  initialState,
  TEdit,
  TPagination,
  TUser,
} from 'store/user/initialState';
import * as TNK from 'store/user/userThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

const thunkArr = [
  TNK.registerThunk,
  TNK.getMeThunk,
  TNK.getUserThunk,
  TNK.deleteUserThunk,
  TNK.updateUserInfoThunk,
  TNK.updatePasswordThunk,
  TNK.updateAvatarThunk,
  TNK.getAllUsersThunk,
];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice

// owner
const handleGetUserSucsess = (
  state: TUser,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, ...action.payload.result });

const ownerSlice = createSlice({
  name: 'owner',
  initialState: initialState.owner,
  reducers: {
    cleanOwner: () => initialState.owner,
  },
  extraReducers: builder => {
    builder
      .addCase(TNK.registerThunk.fulfilled, handleGetUserSucsess)
      .addCase(TNK.getMeThunk.fulfilled, handleGetUserSucsess);
  },
});

// user
const handleUpdateUserSucsess = (
  state: TUser,
  action: PayloadAction<TUser>,
) => ({ ...state, ...action.payload });

const handleSucsess = () => {
  toast.success('Sucsess');
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TNK.getUserThunk.fulfilled, handleGetUserSucsess)
      .addCase(TNK.updateUserInfoThunk.fulfilled, handleUpdateUserSucsess)
      .addCase(TNK.updatePasswordThunk.fulfilled, handleSucsess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSucsess)
      .addCase(TNK.deleteUserThunk.fulfilled, handleSucsess);
  },
});

// edit user
const handleEditUserSucsess = (_: TEdit, action: PayloadAction<TEdit>) =>
  action.payload;

const editSlice = createSlice({
  name: 'edit',
  initialState: initialState.edit,
  reducers: { editUser: handleEditUserSucsess },
});

// userList
const handleGetAllUsersSucsess = (
  state: TUser[],
  action: PayloadAction<{ result: { users: TUser[] } }>,
) => state.concat(action.payload.result.users);

const userListSlice = createSlice({
  name: 'userList',
  initialState: initialState.userList,
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
  name: 'pagination',
  initialState: initialState.pagination,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(TNK.getAllUsersThunk.fulfilled, handlePaginationSucsess);
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
  owner: ownerSlice.reducer,
  user: userSlice.reducer,
  userList: userListSlice.reducer,
  pagination: paginationSlice.reducer,
  edit: editSlice.reducer,
  loading: usersLoadingSlice.reducer,
  error: usersErrorSlice.reducer,
});

export const { editUser } = editSlice.actions;
export const { cleanOwner } = ownerSlice.actions;
