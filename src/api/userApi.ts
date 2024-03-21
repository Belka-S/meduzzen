import { apiClient, token } from './apiHttp';

export type TCredentials = {
  name?: string;
  email: string;
  password?: string;
};

// auth
export const register = async (credentials: TCredentials) => {
  const { data } = await apiClient.post('/auth/register', credentials);
  token.set(data.result.user.accessToken);
  return data;
};

export const login = async (credentials: TCredentials) => {
  const { data } = await apiClient.post('/user', credentials);
  token.set(data.result.user.accessToken);
  return data;
};
