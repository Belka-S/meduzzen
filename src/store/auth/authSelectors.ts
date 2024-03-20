import { TRootState } from 'store';

export const selectUser = (state: TRootState) => state.auth.user;
export const selectLoading = (state: TRootState) => state.auth.loading;
export const selectError = (state: TRootState) => state.auth.error;
