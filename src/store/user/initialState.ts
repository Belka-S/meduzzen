import { TEdit, TPagination, TUser } from 'store';

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
