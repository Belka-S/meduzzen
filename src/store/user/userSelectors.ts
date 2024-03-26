import { TRootState } from 'store';

export const selectOwner = (state: TRootState) => state.users.owner;
export const selectUser = (state: TRootState) => state.users.user;
export const selectEdit = (state: TRootState) => state.users.edit;
export const selectUserList = (state: TRootState) => state.users.userList;
export const selectPagination = (state: TRootState) => state.users.pagination;

export const selectLoading = (state: TRootState) => state.users.loading;
export const selectError = (state: TRootState) => state.users.error;
