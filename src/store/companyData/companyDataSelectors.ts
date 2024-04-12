import { TRootState } from 'store';

export const selectCompanyData = (state: TRootState) => state.companyData;

export const selectLoading = (state: TRootState) => state.companyData.loading;
export const selectError = (state: TRootState) => state.companyData.error;
