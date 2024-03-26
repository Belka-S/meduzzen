import { TUser } from 'store/user';

import { apiClient, token } from './apiHttp';

export type TParams = { page: number; page_size: number };

export const getAllUsers = async (accessToken: string, params: TParams) => {
  token.set(accessToken);
  const { data } = await apiClient.get('/users', { params });
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
  );
  return data;
};
