import { TRootState } from 'store';

export const selectCompany = (state: TRootState) => state.companies.company;
export const selectEdit = (state: TRootState) => state.companies.edit;
export const selectCompanyList = (state: TRootState) =>
  state.companies.companyList;
export const selectPagination = (state: TRootState) =>
  state.companies.pagination;

export const selectLoading = (state: TRootState) => state.companies.loading;
export const selectError = (state: TRootState) => state.companies.error;
