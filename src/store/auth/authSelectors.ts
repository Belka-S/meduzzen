import { TRootState } from 'store';

export const selectUser = (state: TRootState) => state.auth.user;
export const selectIsLoading = (state: TRootState) => state.auth.isLoading;
export const selectError = (state: TRootState) => state.auth.error;
