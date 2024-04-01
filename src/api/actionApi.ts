import { TActionParams, TCompany } from 'store';

import { apiClient, token } from './apiHttp';

export const createActionFromUser = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(
    `/action/create_from_user/company/${company_id}/`,
  );
  return data;
};

export const createActionFromCompany = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { company_id, user_id } = params;
  const { data } = await apiClient.get(
    `/action/create_from_company/${company_id}/user/${user_id}/`,
  );
  return data;
};

export const acceptActionInvite = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/action/${action_id}/accept_invite/`);
  return data;
};

export const acceptActionRequest = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/action/${action_id}/accept_request/`);
  return data;
};

export const declineAction = async (accessToken: string, action_id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/action/${action_id}/decline_action/`);
  return data;
};

export const addMemberToAdmin = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/action/${action_id}/add_to_admin/`);
  return data;
};

export const removeMemberFromAdmin = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/action/${action_id}/remove_from_admin/`,
  );
  return data;
};

export const addMemberToBlock = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/action/${action_id}/add_to_block/`);
  return data;
};

export const removeMemberFromBlock = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/action/${action_id}/remove_from_block/`,
  );
  return data;
};

export const leaveMemberFromCompany = async (
  accessToken: string,
  action_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/action/${action_id}/leave_company/`);
  return data;
};
