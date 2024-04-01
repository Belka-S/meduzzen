import { TRootState } from 'store';

export const selectData = (state: TRootState) => state.userData;

export const selectLoading = (state: TRootState) => state.userData.loading;
export const selectError = (state: TRootState) => state.userData.error;
