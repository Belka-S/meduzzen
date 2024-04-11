import { TActionParams } from 'store';

import { apiClientToken } from './apiHttp';

export const createActionFromUser = async (params: { company_id: number }) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/action/create_from_user/company/${company_id}/`,
  );
  return data;
};

export const createActionFromCompany = async (params: TActionParams) => {
  const { company_id, user_id } = params;
  const { data } = await apiClientToken.get(
    `/action/create_from_company/${company_id}/user/${user_id}/`,
  );
  return data;
};

export const acceptActionInvite = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/accept_invite/`,
  );
  return data;
};

export const acceptActionRequest = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/accept_request/`,
  );
  return data;
};

export const declineAction = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/decline_action/`,
  );
  return data;
};

export const addMemberToAdmin = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/add_to_admin/`,
  );
  return data;
};

export const removeMemberFromAdmin = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/remove_from_admin/`,
  );
  return data;
};

export const addMemberToBlock = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/add_to_block/`,
  );
  return data;
};

export const removeMemberFromBlock = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/remove_from_block/`,
  );
  return data;
};

export const leaveMemberFromCompany = async (params: { action_id: number }) => {
  const { action_id } = params;
  const { data } = await apiClientToken.get(
    `/action/${action_id}/leave_company/`,
  );
  return data;
};
