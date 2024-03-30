import { TUser } from 'store';

import { apiClient, token } from './apiHttp';

export interface IAuthCredentials extends Pick<TUser, 'user_email'> {
  user_password: string;
}

export const login = async (credentials: IAuthCredentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  token.set(data.result.access_token);
  return data;
};
