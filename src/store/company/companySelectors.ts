import { TRootState } from 'store';

export const selectCompany = (state: TRootState) => state.companies.company;
export const selectEdit = (state: TRootState) => state.companies.edit;
export const selectCompanyList = (state: TRootState) =>
  state.companies.companyList;
export const selectPagination = (state: TRootState) =>
  state.companies.pagination;

export const selectCompanyOwner = (state: TRootState) =>
  state.companies.company?.company_owner?.user_email;
export const selectCompanyTitle = (state: TRootState) =>
  state.companies.company?.company_title;
export const selectCompanyCity = (state: TRootState) =>
  state.companies.company?.company_city;
export const selectCompanyPhone = (state: TRootState) =>
  state.companies.company?.company_phone;
export const selectCompanyDescription = (state: TRootState) =>
  state.companies.company?.company_description;

export const selectLoading = (state: TRootState) => state.companies.loading;
export const selectError = (state: TRootState) => state.companies.error;
