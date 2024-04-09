import { TRootState } from 'store';

export const selectQuizzes = (state: TRootState) => state.quizzes;
export const selectQuiz = (state: TRootState) => state.quizzes.quiz;
export const selectAnswers = (state: TRootState) => state.quizzes.answers;

export const selectLoading = (state: TRootState) => state.users.loading;
export const selectError = (state: TRootState) => state.users.error;
