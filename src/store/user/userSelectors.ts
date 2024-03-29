import { TRootState } from 'store';

export const selectOwner = (state: TRootState) => state.users.owner;
export const selectUser = (state: TRootState) => state.users.user;
export const selectEdit = (state: TRootState) => state.users.edit;
export const selectUserList = (state: TRootState) => state.users.userList;
export const selectPagination = (state: TRootState) => state.users.pagination;

export const selectUserEmail = (state: TRootState) =>
  state.users.user?.user_email;
export const selectUserCity = (state: TRootState) =>
  state.users.user?.user_city;
export const selectUserPhone = (state: TRootState) =>
  state.users.user?.user_phone;
export const selectUserStatus = (state: TRootState) =>
  state.users.user?.user_status;

export const selectLoading = (state: TRootState) => state.users.loading;
export const selectError = (state: TRootState) => state.users.error;
