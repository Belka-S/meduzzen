import {
  TCompany,
  TCompanyFromList,
  TCompanySelect,
  TEdit,
  TPagination,
  TProfileAppendix,
} from 'store';

export type TInitialState = {
  company: TCompany | null;
  companyList: TCompanyFromList[];
  pagination: TPagination;
  select: TCompanySelect;
  checked: Pick<TCompany, 'company_id'>[];
  profileAppendix: TProfileAppendix;
  edit: TEdit;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  company: null,
  companyList: [],
  pagination: { current_page: 0, total_page: 0 },
  select: 'own',
  checked: [],
  profileAppendix: false,
  edit: false,

  loading: false,
  error: false,
};
