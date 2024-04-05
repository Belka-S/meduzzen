import {
  TEdit,
  TPagination,
  TUser,
  TUserAppendix,
  TUserOfAction,
  TUserOfList,
} from 'store';

export type TInitialState = {
  owner: TUser | null;
  user: TUser | null;
  userList: TUserOfList[];
  pagination: TPagination;
  checked: TUserOfAction[];
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
