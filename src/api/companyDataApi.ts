import { TActionParams, TCompany, TQuizCompanyParams } from 'store';

import { apiClient, token } from './apiHttp';

export const getMembersList = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(`/company/${company_id}/members_list/`);
  return data;
};

export const getInvitesList = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(`/company/${company_id}/invites_list/`);
  return data;
};

export const getRequestsList = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(`/company/${company_id}/requests_list/`);
  return data;
};

export const getBlockedList = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(`/company/${company_id}/blocked_list/`);
  return data;
};

export const getQuizzesList = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(`/company/${company_id}/quizzes_list/`);
  return data;
};

export const getAnswersListForCompany = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/last_answers_list/`,
  );
  return data;
};

export const getLastAnswersCsvForCompany = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/last_answers_csv/`,
  );
  return data;
};

export const getLastAnswersListForUserInCompany = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { company_id, user_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/last_answers_list_for_user/${user_id}/`,
  );
  return data;
};

export const getLastAnswersCsvForUserInCompany = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { company_id, user_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/last_answers_csv_for_user/${user_id}/`,
  );
  return data;
};

export const getLastAnswersListForQuizInCompany = async (
  accessToken: string,
  params: TQuizCompanyParams,
) => {
  token.set(accessToken);
  const { company_id, quiz_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/last_answers_list_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getLastAnswersCsvForQuizInCompany = async (
  accessToken: string,
  params: TQuizCompanyParams,
) => {
  token.set(accessToken);
  const { company_id, quiz_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/last_answers_csv_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getSummaryRatingForUsers = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/summary_rating_for_users/`,
  );
  return data;
};

export const getSummaryRatingAnalyticForUsers = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/summary_rating_analytic_for_users/`,
  );
  return data;
};

export const getSummaryRatingForUser = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { company_id, user_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/summary_rating_for_user/${user_id}/`,
  );
  return data;
};

export const getSummaryRatingAnalyticForUser = async (
  accessToken: string,
  params: TActionParams,
) => {
  token.set(accessToken);
  const { company_id, user_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/summary_rating_analytic_for_user/${user_id}/`,
  );
  return data;
};

export const getSummaryRatingForQuiz = async (
  accessToken: string,
  params: TQuizCompanyParams,
) => {
  token.set(accessToken);
  const { company_id, quiz_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/summary_rating_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getSummaryRatingAnalyticForQuiz = async (
  accessToken: string,
  params: TQuizCompanyParams,
) => {
  token.set(accessToken);
  const { company_id, quiz_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/summary_rating_analytic_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getQuizzesLastPassInCompany = async (
  accessToken: string,
  params: Pick<TCompany, 'company_id'>,
) => {
  token.set(accessToken);
  const { company_id } = params;
  const { data } = await apiClient.get(
    `/company/${company_id}/quizzes_last_pass/`,
  );
  return data;
};
