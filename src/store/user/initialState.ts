import {
  TEdit,
  TPagination,
  TProfileAppendix,
  TUser,
  TUserFromList,
} from 'store';

export type TInitialState = {
  owner: Partial<TUser> | null;
  user: TUser | null;
  userList: TUserFromList[];
  pagination: TPagination;
  checked: Pick<TUser, 'user_id'>[];
  profileAppendix: TProfileAppendix;
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
  profileAppendix: false,
  edit: false,

  loading: false,
  error: false,
};
