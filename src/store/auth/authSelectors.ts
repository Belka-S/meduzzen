import { TRootState } from 'store';

export const selectToken = (state: TRootState) =>
  state.auth.token?.access_token;

export const selectLoading = (state: TRootState) => state.auth.loading;
export const selectError = (state: TRootState) => state.auth.error;
