import { TRootState } from 'store';

export const selectCommon = (state: TRootState) => state.common.server;
export const selectLoading = (state: TRootState) => state.common.loading;
export const selectError = (state: TRootState) => state.common.error;
