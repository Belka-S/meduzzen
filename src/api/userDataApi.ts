import {
  TActionParams,
  TNotificationParams,
  TQuizUserParams,
  TUser,
} from 'store';

import { apiClient, token } from './apiHttp';

export const getCompaniesList = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/companies_list/`);
  return data;
};

export const getIvitesList = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/invites_list/`);
  return data;
};

export const getRequestsList = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/requests_list/`);
  return data;
};

export const getGlobalRating = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/global_rating/`);
  return data;
};

export const getGlobalRatingAnalytic = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(
    `/user/${user_id}/global_rating_analytic/`,
  );
  return data;
};

export const getRatingInCompany = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { user_id, company_id } = params;
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_in_company/${company_id}/`,
  );
  return data;
};

export const getRatingAnalyticInCompany = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { user_id, company_id } = params;
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_analytic_in_company/${company_id}/`,
  );
  return data;
};

export const getRatingForQuiz = async (
  accessToken: string,
  params: TQuizUserParams,
) => {
  token.set(accessToken);
  const { user_id, quiz_id } = params;
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getRatingAnalyticForQuiz = async (
  accessToken: string,
  params: TQuizUserParams,
) => {
  token.set(accessToken);
  const { user_id, quiz_id } = params;
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_analytic_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getLastAnswersList = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/last_answers_list/`);
  return data;
};

export const getLastAnswersCsv = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/last_answers_csv/`);
  return data;
};

export const getQuizzesLastPass = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/quizzes_last_pass/`);
  return data;
};

export const getNotificationsList = async (
  accessToken: string,
  params: Pick<TUser, 'user_id'>,
) => {
  token.set(accessToken);
  const { user_id } = params;
  const { data } = await apiClient.get(`/user/${user_id}/notifications_list/`);
  return data;
};

export const markNotificationAsRead = async (
  accessToken: string,
  params: TNotificationParams,
) => {
  token.set(accessToken);
  const { user_id, notification_id } = params;
  const { data } = await apiClient.get(
    `/user/${user_id}/mark_notification_as_read/${notification_id}/`,
  );
  return data;
};
