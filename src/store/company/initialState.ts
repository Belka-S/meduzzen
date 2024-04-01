import { TCompaniesList, TCompany, TEdit, TPagination } from 'store';

export type TInitialState = {
  company: TCompany | null;
  companiesList: TCompaniesList;
  pagination: TPagination;
  edit: TEdit;
};

export const initialState: TInitialState = {
  company: null,
  companiesList: [],
  pagination: { current_page: 0, total_page: 0 },
  edit: false,
};
