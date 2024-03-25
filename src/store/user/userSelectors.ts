import { TRootState } from 'store';

export const selectUsers = (state: TRootState) => state.users.userList;
export const selectPagination = (state: TRootState) => state.users.pagination;
export const selectActive = (state: TRootState) => state.users.active;

export const selectLoading = (state: TRootState) => state.users.loading;
export const selectError = (state: TRootState) => state.users.error;
