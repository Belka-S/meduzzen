import { TQuestion, TQuizCreate, TQuizOfList } from 'store';

import { apiClientToken } from './apiHttp';

export const createQuiz = async (params: TQuizCreate) => {
  const { data } = await apiClientToken.post('/quiz/', params);
  return data;
};

export const getQuiz = async (params: { quiz_id: number }) => {
  const { quiz_id } = params;
  const { data } = await apiClientToken.get(`/quiz/${quiz_id}/`);
  return data;
};

export const updateQuiz = async (quizz: TQuizOfList) => {
  const { quiz_id, ...credentials } = quizz;
  const { data } = await apiClientToken.put(
    `/quiz/${quiz_id}/update_info/`,
    credentials,
  );
  return data;
};

export const deleteQuiz = async (params: { quiz_id: number }) => {
  const { quiz_id } = params;
  const { data } = await apiClientToken.delete(`/quiz/${quiz_id}/`);
  return data;
};

export const takeQuiz = async (params: { quiz_id: number }) => {
  const { quiz_id } = params;
  const { data } = await apiClientToken.delete(`/quiz/${quiz_id}/take_quiz/`);
  return data;
};

export const addQuestion = async (params: TQuestion & { quiz_id: number }) => {
  const { quiz_id } = params;
  const { data } = await apiClientToken.post(`/quiz/${quiz_id}/add_question/`, {
    params,
  });
  return data;
};

export const updateQuestion = async (
  params: TQuestion & { question_id: number },
) => {
  const { question_id } = params;
  const { data } = await apiClientToken.put(
    `/question/${question_id}/update_info/`,
    params,
  );
  return data;
};

export const deleteQuestion = async (params: { question_id: number }) => {
  const { question_id } = params;
  const { data } = await apiClientToken.delete(`/question/${question_id}/`);
  return data;
};
