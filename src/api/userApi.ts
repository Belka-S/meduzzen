import { TPaginationParams, TRegister, TUser } from 'store';

import { apiClient, apiClientToken } from './apiHttp';

export const register = async (credentials: TRegister) => {
  const { data } = await apiClient.post('/user/', credentials);
  const { user_email, user_firstname, user_lastname } = credentials;
  data.result = {
    ...data.result,
    user_email,
    user_firstname,
    user_lastname,
    user_avatar: '',
    user_status: '',
    user_city: '',
    user_phone: '',
    user_links: [],
    is_superuser: false,
  };
  return data;
};

export const getMe = async () => {
  const { data } = await apiClientToken.get('/auth/me/');
  return data;
};

export const getUser = async (params: { user_id: number }) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(`/user/${user_id}`);
  return data;
};

export const deleteUser = async (params: { user_id: number }) => {
  const { user_id } = params;
  const { data } = await apiClientToken.delete(`/user/${user_id}`);
  return data;
};

export const updateUserInfo = async (user: Partial<TUser>) => {
  const { user_id, ...credentials } = user;

  const { data } = await apiClientToken.put(
    `/user/${user_id}/update_info/`,
    credentials,
  );
  return data;
};

export const updatePassword = async (user: Partial<TUser>) => {
  const { user_id, ...credentials } = user;

  const { data } = await apiClientToken.put(
    `/user/${user_id}/update_password/`,
    credentials,
  );
  return data;
};

export const updateAvatar = async (user_id: number, formData: FormData) => {
  const { data } = await apiClientToken.put(
    `/user/${user_id}/update_avatar/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
};

export const getAllUsers = async (params: TPaginationParams) => {
  const { data } = await apiClientToken.get('/users/', { params });
  return data;
};
