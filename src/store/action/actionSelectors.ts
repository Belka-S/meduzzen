import { TRootState } from 'store';

export const selectAction = (state: TRootState) => state.actions;

export const selectLoading = (state: TRootState) => state.actions.loading;
export const selectError = (state: TRootState) => state.actions.error;
