import { TCompany, TPaginationParams } from 'store';

import { apiClient, token } from './apiHttp';

export const createCompany = async (
  credentials: Pick<TCompany, 'is_visible' | 'company_name'>,
) => {
  const { data } = await apiClient.post('/company/', credentials);
  const { company_name, is_visible } = credentials;
  data.result = { ...data.result, company_name, is_visible };
  return data;
};

export const getCompany = async (accessToken: string, id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/company/${id}`);
  return data;
};

export const deleteCompany = async (accessToken: string, id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.delete(`/company/${id}`);
  data.result = { ...data.result, company_id: id };
  return data;
};

export const updateCompanyInfo = async (
  accessToken: string,
  company: Partial<TCompany>,
) => {
  const { company_id, ...credentials } = company;
  token.set(accessToken);
  const { data } = await apiClient.put(
    `/company/${company_id}/update_info/`,
    credentials,
  );
  return data;
};

export const updateVisible = async (
  accessToken: string,
  company: Pick<TCompany, 'is_visible' | 'company_id'>,
) => {
  const { company_id, ...credentials } = company;
  token.set(accessToken);
  const { data } = await apiClient.put(
    `/company/${company_id}/update_visible/`,
    credentials,
  );
  return data;
};

export const updateAvatar = async (
  accessToken: string,
  company_id: number,
  formData: FormData,
) => {
  token.set(accessToken);
  const { data } = await apiClient.put(
    `/company/${company_id}/update_avatar/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
};

export const getAllCompanies = async (
  accessToken: string,
  params: TPaginationParams,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get('/companies/', { params });
  return data;
};
