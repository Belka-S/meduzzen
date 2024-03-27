import { TUser } from 'store/user';

import { apiClient, token } from './apiHttp';

export const auth = async (credentials: Partial<TUser>) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  token.set(data.result.access_token);
  return data;
};

export const login = async (accessToken: string) => {
  token.set(accessToken);
  const { data } = await apiClient.get('/auth/me/');
  return data;
};

export const register = async (credentials: Partial<TUser>) => {
  const { data } = await apiClient.post('/user/', credentials);
  const user_email = credentials.user_email;
  data.result = { ...data.result, user_email };
  return data;
};
