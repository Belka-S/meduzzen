import { TActionParams, TCompany, TQuizCompanyParams } from 'store';

import { apiClientToken } from './apiHttp';

export const getMembersList = async (params: Pick<TCompany, 'company_id'>) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/members_list/`,
  );
  return data;
};

export const getInvitesList = async (params: Pick<TCompany, 'company_id'>) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/invites_list/`,
  );
  return data;
};

export const getRequestsList = async (params: Pick<TCompany, 'company_id'>) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/requests_list/`,
  );
  return data;
};

export const getBlockedList = async (params: Pick<TCompany, 'company_id'>) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/blocked_list/`,
  );
  return data;
};

export const getQuizzesList = async (params: Pick<TCompany, 'company_id'>) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/quizzes_list/`,
  );
  return data;
};

export const getAnswersListForCompany = async (
  params: Pick<TCompany, 'company_id'>,
) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/last_answers_list/`,
  );
  return data;
};

export const getLastAnswersCsvForCompany = async (
  params: Pick<TCompany, 'company_id'>,
) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/last_answers_csv/`,
  );
  return data;
};

export const getLastAnswersListForUserInCompany = async (
  params: TActionParams,
) => {
  const { company_id, user_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/last_answers_list_for_user/${user_id}/`,
  );
  return data;
};

export const getLastAnswersCsvForUserInCompany = async (
  params: TActionParams,
) => {
  const { company_id, user_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/last_answers_csv_for_user/${user_id}/`,
  );
  return data;
};

export const getLastAnswersListForQuizInCompany = async (
  params: TQuizCompanyParams,
) => {
  const { company_id, quiz_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/last_answers_list_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getLastAnswersCsvForQuizInCompany = async (
  params: TQuizCompanyParams,
) => {
  const { company_id, quiz_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/last_answers_csv_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getSummaryRatingForUsers = async (
  params: Pick<TCompany, 'company_id'>,
) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/summary_rating_for_users/`,
  );
  return data;
};

export const getSummaryRatingAnalyticForUsers = async (
  params: Pick<TCompany, 'company_id'>,
) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/summary_rating_analytic_for_users/`,
  );
  return data;
};

export const getSummaryRatingForUser = async (params: TActionParams) => {
  const { company_id, user_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/summary_rating_for_user/${user_id}/`,
  );
  return data;
};

export const getSummaryRatingAnalyticForUser = async (
  params: TActionParams,
) => {
  const { company_id, user_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/summary_rating_analytic_for_user/${user_id}/`,
  );
  return data;
};

export const getSummaryRatingForQuiz = async (params: TQuizCompanyParams) => {
  const { company_id, quiz_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/summary_rating_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getSummaryRatingAnalyticForQuiz = async (
  params: TQuizCompanyParams,
) => {
  const { company_id, quiz_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/summary_rating_analytic_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getQuizzesLastPassInCompany = async (
  params: Pick<TCompany, 'company_id'>,
) => {
  const { company_id } = params;
  const { data } = await apiClientToken.get(
    `/company/${company_id}/quizzes_last_pass/`,
  );
  return data;
};
