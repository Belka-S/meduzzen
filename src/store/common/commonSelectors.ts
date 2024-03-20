import { TRootState } from 'store';

export const selectCommon = (state: TRootState) => state.common.server;
export const selectIsLoading = (state: TRootState) => state.common.isLoading;
export const selectError = (state: TRootState) => state.common.error;
