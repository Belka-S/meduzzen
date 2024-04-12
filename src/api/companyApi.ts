import { TCompany, TPaginationParams } from 'store';

import { apiClientToken } from './apiHttp';

export const createCompany = async (
  credentials: Pick<TCompany, 'company_name' | 'is_visible'>,
) => {
  const { data } = await apiClientToken.post('/company/', credentials);
  const { company_name, is_visible } = credentials;
  data.result = { ...data.result, company_name, is_visible };
  return data;
};

export const getCompany = async (params: { company_id: number }) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(`/company/${company_id}`);
  return data;
};

export const deleteCompany = async (params: { company_id: number }) => {
  const { company_id } = params;
  const { data } = await apiClientToken.delete(`/company/${company_id}`);
  data.result = { ...data.result, company_id };
  return data;
};

export const updateCompanyInfo = async (company: Partial<TCompany>) => {
  const { company_id, ...credentials } = company;
  const { data } = await apiClientToken.put(
    `/company/${company_id}/update_info/`,
    credentials,
  );
  return data;
};

export const updateVisible = async (
  company: Pick<TCompany, 'is_visible' | 'company_id'>,
) => {
  const { company_id, ...credentials } = company;
  const { data } = await apiClientToken.put(
    `/company/${company_id}/update_visible/`,
    credentials,
  );
  return data;
};

export const updateAvatar = async (company_id: number, formData: FormData) => {
  const { data } = await apiClientToken.put(
    `/company/${company_id}/update_avatar/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
};

export const getAllCompanies = async (params: TPaginationParams) => {
  const { data } = await apiClientToken.get('/companies/', { params });
  return data;
};
