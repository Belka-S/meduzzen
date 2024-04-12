import { toast } from 'react-toastify';
import { TEdit, TPagination, TUser, TUserAppendix, TUserOfList } from 'store';
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

type TState = 'pending' | 'fulfilled' | 'rejected';
const fn = (state: TState) => thunkArr.map(el => el[state]);

// handlers
const handleSuccess = () => {
  toast.success('Success');
};

const handleCheckUser = (
  state: TInitialState,
  action: PayloadAction<TUserOfList>,
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

const handleAppendix = (
  state: TInitialState,
  action: PayloadAction<TUserAppendix>,
) => {
  state.appendix = action.payload;
};

const handleEditSuccess = (
  state: TInitialState,
  action: PayloadAction<TEdit>,
) => {
  state.edit = action.payload;
};

const handleRegisterSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TUser }>,
) => {
  state.owner = action.payload.result;
};

const handleGetMeSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TUser }>,
) => {
  state.owner = action.payload?.result;
};

const handleGetUserSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TUser }>,
) => {
  state.user = action.payload.result;
};

const handleAvatarPreviewSuccess = (
  state: TInitialState,
  action: PayloadAction<Pick<TUser, 'user_avatar'>>,
) => {
  if (!state || !state.user) return;
  const { user_avatar } = action.payload;
  state.user.user_avatar = user_avatar;
};

const handleGetAllSuccess = (
  state: TInitialState,
  action: PayloadAction<{
    result: { users: TUserOfList[]; pagination: TPagination };
  }>,
) => {
  const { users, pagination } = action.payload.result;
  state.userList = [...state.userList, ...users];
  state.pagination = pagination;
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
    setUserAppendix: handleAppendix,
    editUser: handleEditSuccess,
    cleanOwner: state => ({ ...state, owner: null }),
  },
  extraReducers: builder => {
    builder
      // owner success
      .addCase(TNK.registerThunk.fulfilled, handleRegisterSuccess)
      .addCase(TNK.getMeThunk.fulfilled, handleGetMeSuccess)
      // user success
      .addCase(TNK.getUserThunk.fulfilled, handleGetUserSuccess)
      .addCase(TNK.updateInfoThunk.fulfilled, handleSuccess)
      .addCase(TNK.updatePasswordThunk.fulfilled, handleSuccess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSuccess)
      .addCase(TNK.deleteUserThunk.fulfilled, handleSuccess)
      // userList success
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
  setUserAppendix,
  editUser,
} = userSlice.actions;
