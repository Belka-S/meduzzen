import { TCompany, TEdit, TPagination } from 'store';

export type TInitialState = {
  company: TCompany | null;
  companyList: TCompany[];
  pagination: TPagination;
  edit: TEdit;
};

export const initialState: TInitialState = {
  company: null,
  companyList: [],
  pagination: { current_page: 0, total_page: 0 },
  edit: false,
};
