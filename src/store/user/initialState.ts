import { TAppendix, TEdit, TPagination, TUser } from 'store';

export type TInitialState = {
  owner: TUser | null;
  user: TUser | null;
  userList: TUser[];
  pagination: TPagination;
  checked: Pick<TUser, 'user_id'>[];
  appendix: TAppendix;
  edit: TEdit;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  owner: null,
  user: null,
  userList: [],
  pagination: { current_page: 0, total_page: 0 },
  checked: [],
  appendix: false,
  edit: false,

  loading: false,
  error: false,
};
