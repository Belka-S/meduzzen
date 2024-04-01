import { TEdit, TPagination, TUser } from 'store';

export type TInitialState = {
  owner: Partial<TUser> | null;
  user: TUser | null;
  userList: TUser[];
  pagination: TPagination;
  edit: TEdit;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  owner: null,
  user: null,
  userList: [],
  pagination: { current_page: 0, total_page: 0 },
  edit: false,

  loading: false,
  error: false,
};
