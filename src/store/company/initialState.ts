import { TCompaniesList, TCompany, TEdit, TPagination } from 'store';

export type TInitialState = {
  company: TCompany | null;
  companyList: TCompaniesList;
  pagination: TPagination;
  edit: TEdit;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  company: null,
  companyList: [],
  pagination: { current_page: 0, total_page: 0 },
  edit: false,

  loading: false,
  error: false,
};
