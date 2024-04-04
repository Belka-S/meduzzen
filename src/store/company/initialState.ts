import {
  TAppendix,
  TCompany,
  TCompanyOfList,
  TCompanySelect,
  TEdit,
  TPagination,
} from 'store';

export type TInitialState = {
  company: TCompany | null;
  companyList: TCompanyOfList[];
  pagination: TPagination;
  select: TCompanySelect;
  checked: Pick<TCompany, 'company_id'>[];
  appendix: TAppendix;
  edit: TEdit;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  company: null,
  companyList: [],
  pagination: { current_page: 0, total_page: 0 },
  select: 'all',
  checked: [],
  appendix: null,
  edit: false,

  loading: false,
  error: false,
};
