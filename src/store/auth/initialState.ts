export type TUser = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
  is_superuser: boolean;

  access_token: string;
  token_type: string;
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

  access_token: '',
  token_type: '',
};
