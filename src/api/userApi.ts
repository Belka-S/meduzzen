import { apiClient, token } from './apiHttp';

export type TCredentials = {
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_password: string;
  user_password_repeat: string;
};

export const register = async (credentials: TCredentials) => {
  const { data } = await apiClient.post('/user', credentials);
  return data;
};
