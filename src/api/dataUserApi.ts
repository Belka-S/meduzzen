import { apiClient, token } from './apiHttp';

export const getCompaniesList = async (
  accessToken: string,
  user_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/companies_list/`);
  return data;
};

export const getIvitesList = async (accessToken: string, user_id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/invites_list/`);
  return data;
};

export const getRequestsList = async (accessToken: string, user_id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/requests_list/`);
  return data;
};

export const getGlobalRating = async (accessToken: string, user_id: number) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/global_rating/`);
  return data;
};

export const getGlobalRatingAnalytic = async (
  accessToken: string,
  user_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/user/${user_id}/global_rating_analytic/`,
  );
  return data;
};

export const getRatingInCompany = async (
  accessToken: string,
  user_id: number,
  company_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_in_company/${company_id}/`,
  );
  return data;
};

export const getRatingAnalyticInCompany = async (
  accessToken: string,
  user_id: number,
  company_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_analytic_in_company/${company_id}/`,
  );
  return data;
};

export const getRatingForQuiz = async (
  accessToken: string,
  user_id: number,
  quiz_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getRatingAnalyticForQuiz = async (
  accessToken: string,
  user_id: number,
  quiz_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/user/${user_id}/rating_analytic_for_quiz/${quiz_id}/`,
  );
  return data;
};

export const getLastAnswersList = async (
  accessToken: string,
  user_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/last_answers_list/`);
  return data;
};

export const getLastAnswersCsv = async (
  accessToken: string,
  user_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/last_answers_csv/`);
  return data;
};

export const getQuizzesLastPass = async (
  accessToken: string,
  user_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/quizzes_last_pass/`);
  return data;
};

export const getNotificationsList = async (
  accessToken: string,
  user_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(`/user/${user_id}/notifications_list/`);
  return data;
};

export const markNotificationAsRead = async (
  accessToken: string,
  user_id: number,
  notification_id: number,
) => {
  token.set(accessToken);
  const { data } = await apiClient.get(
    `/user/${user_id}/mark_notification_as_read/${notification_id}/`,
  );
  return data;
};
