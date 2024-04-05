import { TEdit, TPagination, TUser, TUserAppendix, TUserOfList } from 'store';

export type TInitialState = {
  owner: TUser | null;
  user: TUser | null;
  userList: TUserOfList[];
  pagination: TPagination;
  checked: Pick<TUser, 'user_id'>[];
  appendix: TUserAppendix;
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
  appendix: null,
  edit: false,

  loading: false,
  error: false,
};
