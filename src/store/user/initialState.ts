export type TUser = {
  user_id?: number;
  user_email?: string;
  user_firstname?: string;
  user_lastname?: string;
  user_avatar?: string;
  user_status?: string | null;
  user_city?: string | null;
  user_phone?: string | null;
  user_links?: string[];
  is_superuser?: boolean;
};

export type TPagination = {
  current_page: number;
  total_page: number;
  total_results?: number;
};

export type TEdit = false | 'avatar' | 'data';

export type TInitialState = {
  owner: TUser | null;
  user: TUser | null;
  userList: TUser[];
  pagination: TPagination;
  edit: TEdit;
};

export const initialState: TInitialState = {
  owner: null,
  user: null,
  edit: false,
  userList: [],
  pagination: { current_page: 0, total_page: 0 },
};
