import { TUser } from 'store/user';

import { apiClient, token } from './apiHttp';
import { IAuthCredentials } from './authApi';

export interface IRegisterCredentials extends IAuthCredentials {
  user_firstname: string;
  user_lastname: string;
  user_password_repeat: string;
}

export type TPaginationParams = { page: number; page_size: number };

export const register = async (credentials: IRegisterCredentials) => {
  const { data } = await apiClient.post('/user/', credentials);
  const user_email = credentials.user_email;
  data.result = { ...data.result, user_email };
  return data;
};

export const getMe = async (accessToken: string) => {
  token.set(accessToken);
  const { data } = await apiClient.get('/auth/me/');
  return data;
};

export const getUser = async (accessToken: string, id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${id}`);
  return data;
};

export const deleteUser = async (accessToken: string, id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.delete(`/user/${id}`);
  return data;
};

export const updateUserInfo = async (
  accessToken: string,
  user: Partial<TUser>,
) => {
  const { user_id, ...credentials } = user;
  token.set(accessToken);
  const { data } = await apiClient.put(
    `/user/${user_id}/update_info/`,
    credentials,
  );
  return data;
};

export const updatePassword = async (
  accessToken: string,
  user: Partial<TUser>,
) => {
  const { user_id, ...credentials } = user;
  token.set(accessToken);
  const { data } = await apiClient.put(
    `/user/${user_id}/update_password/`,
    credentials,
  );
  return data;
};

export const updateAvatar = async (
  accessToken: string,
  user_id: number,
  formData: FormData,
) => {
  token.set(accessToken);
  const { data } = await apiClient.put(
    `/user/${user_id}/update_avatar/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
};

export const getAllUsers = async (
  accessToken: string,
  params: TPaginationParams,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get('/users/', { params });
  return data;
};
