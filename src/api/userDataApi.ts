import {
  TActionParams,
  TNotificationParams,
  TQuizUserParams,
  TUser,
} from 'store';

import { apiClientToken } from './apiHttp';

export const getCompaniesList = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(`/user/${user_id}/companies_list/`);
  return data;
};

export const getIvitesList = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(`/user/${user_id}/invites_list/`);
  return data;
};

export const getRequestsList = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(`/user/${user_id}/requests_list/`);
  return data;
};

export const getGlobalRating = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(`/user/${user_id}/global_rating/`);
  return data;
};

export const getGlobalRatingAnalytic = async (
  params: Pick<TUser, 'user_id'>,
) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/global_rating_analytic/`,
  );
  return data;
};

export const getRatingInCompany = async (params: TActionParams) => {
  const { user_id, company_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/rating_in_company/${company_id}/`,
  );
  return data;
};

export const getRatingAnalyticInCompany = async (params: TActionParams) => {
  const { user_id, company_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/rating_analytic_in_company/${company_id}/`,
  );
  return data;
};

export const getRatingForQuiz = async (params: TQuizUserParams) => {
  const { user_id, quiz_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/rating_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getRatingAnalyticForQuiz = async (params: TQuizUserParams) => {
  const { user_id, quiz_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/rating_analytic_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getLastAnswersList = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/last_answers_list/`,
  );
  return data;
};

export const getLastAnswersCsv = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/last_answers_csv/`,
  );
  return data;
};

export const getQuizzesLastPass = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/quizzes_last_pass/`,
  );
  return data;
};

export const getNotificationsList = async (params: Pick<TUser, 'user_id'>) => {
  const { user_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/notifications_list/`,
  );
  return data;
};

export const markNotificationAsRead = async (params: TNotificationParams) => {
  const { user_id, notification_id } = params;
  const { data } = await apiClientToken.get(
    `/user/${user_id}/mark_notification_as_read/${notification_id}/`,
  );
  return data;
};
