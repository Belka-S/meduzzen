import { apiClient, token } from './apiHttp';

export type TAuthCredentials = { user_email: string; user_password: string };

export const login = async (credentials: TAuthCredentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  token.set(data.result.access_token);
  return data;
};
