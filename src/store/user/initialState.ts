export type TUser = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string | null;
  user_city: string | null;
  user_phone: string | null;
  user_links: string[] | null;
  is_superuser: boolean;

  edit?: false | 'avatar' | 'data';
};

export const usersInitialState: TUser[] = [];

export type TPagination = {
  current_page: number;
  total_page: number;
  total_results: number;
};

export const paginationInitialState: TPagination = {
  current_page: 0,
  total_page: 0,
  total_results: 0,
};

export const userInitialState: TUser = {
  user_id: NaN,
  user_email: '',
  user_firstname: '',
  user_lastname: '',
  user_avatar: '',
  user_status: '',
  user_city: '',
  user_phone: '',
  user_links: [],
  is_superuser: false,

  edit: false,
};
