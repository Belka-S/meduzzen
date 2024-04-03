import { TPaginationParams, TRegister, TUser } from 'store';

import { apiClient, token } from './apiHttp';

export const register = async (credentials: TRegister) => {
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

export const getUser = async (
  accessToken: string,
  params: { user_id: number },
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}`);
  return data;
};

export const deleteUser = async (
  accessToken: string,
  params: { user_id: number },
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.delete(`/user/${user_id}`);
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
