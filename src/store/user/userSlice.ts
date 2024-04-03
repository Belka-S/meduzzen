import { toast } from 'react-toastify';
import { TEdit, TPagination, TProfileAppendix, TUser } from 'store';
import { initialState, TInitialState } from 'store/user';
import * as TNK from 'store/user/userThunks';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

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

// handlers
const handleSuccess = () => {
  toast.success('Success');
};

const handleGetAllSuccess = (
  state: TInitialState,
  action: PayloadAction<{
    result: { users: TUser[]; pagination: TPagination };
  }>,
) => ({
  ...state,
  userList: state.userList.concat(action.payload.result.users),
  pagination: action.payload.result.pagination,
});

const handleCheckUser = (
  state: TInitialState,
  action: PayloadAction<Pick<TUser, 'user_id'>>,
) => {
  state.checked.push(action.payload);
};

const handleUncheckUser = (
  state: TInitialState,
  action: PayloadAction<Pick<TUser, 'user_id'>>,
) => {
  const { user_id } = action.payload;
  const index = state.checked.findIndex(el => el.user_id === user_id);
  state.checked.splice(index, 1);
};

const handleProfileAppendix = (
  state: TInitialState,
  action: PayloadAction<TProfileAppendix>,
) => ({ ...state, profileAppendix: action.payload });

const handleEditSuccess = (
  state: TInitialState,
  action: PayloadAction<TEdit>,
) => ({ ...state, edit: action.payload });

const handleRegisterSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TUser, 'user_id' | 'user_email'> }>,
) => ({ ...state, owner: action.payload.result });

const handleGetMeSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, owner: action.payload?.result });

const handleGetUserSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TUser }>,
) => ({ ...state, user: action.payload.result });

const handleAvatarPreviewSuccess = (
  state: TInitialState,
  action: PayloadAction<Pick<TUser, 'user_avatar'>>,
) => {
  if (!state || !state.user) return;
  return { ...state, user: { ...state.user, ...action.payload } };
};

// slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateAvatarPreview: handleAvatarPreviewSuccess,
    checkUser: handleCheckUser,
    uncheckUser: handleUncheckUser,
    uncheckAllUsers: state => ({ ...state, checked: [] }),
    setProfileAppendix: handleProfileAppendix,
    editUser: handleEditSuccess,
    cleanOwner: state => ({ ...state, owner: null }),
  },
  extraReducers: builder => {
    builder
      // owner
      .addCase(TNK.registerThunk.fulfilled, handleRegisterSuccess)
      .addCase(TNK.getMeThunk.fulfilled, handleGetMeSuccess)
      // user
      .addCase(TNK.getUserThunk.fulfilled, handleGetUserSuccess)
      .addCase(TNK.updateInfoThunk.fulfilled, handleSuccess)
      .addCase(TNK.updatePasswordThunk.fulfilled, handleSuccess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSuccess)
      .addCase(TNK.deleteUserThunk.fulfilled, handleSuccess)
      // userList
      .addCase(TNK.getAllUsersThunk.fulfilled, handleGetAllSuccess)
      // loading, error
      .addMatcher(isAnyOf(...fn('pending')), state => {
        return { ...state, loading: true, error: false };
      })
      .addMatcher(isAnyOf(...fn('fulfilled')), state => {
        return { ...state, loading: false, error: false };
      })
      .addMatcher(isAnyOf(...fn('rejected')), (state, action) => {
        return { ...state, loading: false, error: action.payload };
      });
  },
});

export const usersReducer = userSlice.reducer;

export const {
  updateAvatarPreview,
  cleanOwner,
  checkUser,
  uncheckAllUsers,
  uncheckUser,
  setProfileAppendix,
  editUser,
} = userSlice.actions;
