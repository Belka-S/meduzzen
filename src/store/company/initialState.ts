export type TCompany = {
  company_id?: number;
  company_name?: string;
  company_title?: string | null;
  company_description?: string | null;
  company_city?: string | null;
  company_phone?: string | null;
  company_avatar?: string;
  is_visible?: boolean;

  company_links?: string[];
  company_owner?: {
    user_id?: number;
    user_email?: string;
    user_firstname?: string;
    user_lastname?: string;
    user_avatar?: string;
  };
};

export type TPagination = {
  current_page: number;
  total_page: number;
  total_results?: number;
};

export type TEdit = false | 'avatar' | 'data';

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
