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

  edit?: false | 'avatar' | 'data';

  access_token: string;
  token_type: string;

  user_password: string;
  user_password_repeat: string;
};

export type TPagination = {
  current_page: number;
  total_page: number;
  total_results: number;
};

export const userInitialState: Partial<TUser> = {};

export const usersInitialState: TUser[] = [];

export const paginationInitialState: TPagination = {
  current_page: 0,
  total_page: 0,
  total_results: 0,
};
