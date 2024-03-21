import { apiClient, token } from './apiHttp';

export type TCredentials = {
  user_email: string;
  user_password?: string;
};

export const auth = async (credentials: TCredentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  token.set(data.result.access_token);
  return data;
};

export const login = async (token: string) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  const { data } = await apiClient.get('/auth/me');
  return data;
};
