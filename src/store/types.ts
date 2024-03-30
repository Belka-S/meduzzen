import { makeStore, rootReducer, store } from 'store';

export type TRootState = ReturnType<typeof rootReducer>; // without rootReducer -> TRootState = ReturnType<typeof store.getState>;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppDispatch = typeof store.dispatch;

export type TAuth = {
  access_token: string;
  token_type?: string;
};

export type TPassword = {
  user_id: number;
  user_password: string;
  user_password_repeat: string;
};

export interface IRegister
  extends Pick<TUser, 'user_email' | 'user_firstname' | 'user_lastname'> {
  user_firstname: string;
  user_password: string;
  user_password_repeat: string;
}

export type TUser = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string | null;
  user_city: string | null;
  user_phone: string | null;
  user_links: string[];
  is_superuser: boolean;
};

export type TCompany = {
  company_id: number;
  company_name: string;
  company_title: string | null;
  company_description: string | null;
  company_city: string | null;
  company_phone: string | null;
  company_avatar: string;
  is_visible: boolean;

  company_links: string[];
  company_owner: {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string;
  };
};

export type TPagination = {
  current_page: number;
  total_page: number;
  total_results?: number;
};

export type TPaginationParams = { page: number; page_size: number };

export type TEdit = false | 'avatar' | 'data';
