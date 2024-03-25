import { TUser, userInitialState } from 'store/user';

export interface TAutorisedUser extends TUser {
  access_token: string;
  token_type: string;
}

export const authorisedUserInitialState: TAutorisedUser = {
  ...userInitialState,

  access_token: '',
  token_type: '',
};
