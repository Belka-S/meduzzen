import { apiClient } from './apiHttp';

export const checkStatus = async () => {
  const { data } = await apiClient.get('/');
  return data;
};

export const getLogs = async () => {
  const { data } = await apiClient.get('/get_system_logs/');
  return data;
};

export const ping = async (val: string) => {
  const { data } = await apiClient.get(`/${val}/`);
  return data;
};
