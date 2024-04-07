import { TRootState } from 'store';

export const selectUserData = (state: TRootState) => state.userData;

export const selectLoading = (state: TRootState) => state.userData.loading;
export const selectError = (state: TRootState) => state.userData.error;
