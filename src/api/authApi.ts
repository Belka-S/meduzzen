import { apiClient, token } from './apiHttp';

export interface IAuthCredentials {
  user_email: string;
  user_password: string;
}

export const login = async (credentials: IAuthCredentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  token.set(data.result.access_token);
  return data;
};
