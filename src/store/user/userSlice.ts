import { toast } from 'react-toastify';
import { initialState, TEdit, TPagination, TUser } from 'store/user';
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
  TNK.updateInfoThunk,
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
const handleGetSuccess = (
  state: TUser | null,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, ...action.payload?.result });

const handleUpdateSuccess = (
  state: TUser | null,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, ...action.payload.result });

const handleAvatarPreviewSuccess = (
  state: TUser | null,
  action: PayloadAction<Pick<TUser, 'user_avatar'>>,
) => ({ ...state, ...action.payload });

const handleGetAllSuccess = (
  state: TUser[],
  action: PayloadAction<{ result: { users: TUser[] } }>,
) => state.concat(action.payload.result.users);

const handlePaginationSuccess = (
  _: TPagination,
  action: PayloadAction<{ result: { pagination: TPagination } }>,
) => action.payload.result.pagination;

const handleEditSuccess = (_: TEdit, action: PayloadAction<TEdit>) =>
  action.payload;

const handleSuccess = () => {
  toast.success('Success');
};

// owner
const ownerSlice = createSlice({
  name: 'owner',
  initialState: initialState.owner,
  reducers: {
    cleanOwner: () => initialState.owner,
  },
  extraReducers: builder => {
    builder
      .addCase(TNK.registerThunk.fulfilled, handleGetSuccess)
      .addCase(TNK.getMeThunk.fulfilled, handleGetSuccess);
  },
});

// user
const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: { updateAvatarPreview: handleAvatarPreviewSuccess },
  extraReducers: builder => {
    builder
      .addCase(TNK.getUserThunk.fulfilled, handleGetSuccess)
      .addCase(TNK.updateInfoThunk.fulfilled, handleUpdateSuccess)
      .addCase(TNK.updatePasswordThunk.fulfilled, handleSuccess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSuccess)
      .addCase(TNK.deleteUserThunk.fulfilled, () => initialState.user);
  },
});

// edit
const editSlice = createSlice({
  name: 'edit',
  initialState: initialState.edit,
  reducers: { editUser: handleEditSuccess },
});

// userList
const userListSlice = createSlice({
  name: 'userList',
  initialState: initialState.userList,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(TNK.getAllUsersThunk.fulfilled, handleGetAllSuccess);
  },
});

// pagination
const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState.pagination,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(TNK.getAllUsersThunk.fulfilled, handlePaginationSuccess);
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
export const { updateAvatarPreview } = userSlice.actions;
