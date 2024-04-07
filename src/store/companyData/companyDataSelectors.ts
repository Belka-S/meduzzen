import { TRootState } from 'store';

export const selectCompanyData = (state: TRootState) => state.companyData;
export const selectMyCompanies = (state: TRootState) =>
  state.userData.myCompanies;

export const selectLoading = (state: TRootState) => state.userData.loading;
export const selectError = (state: TRootState) => state.userData.error;
