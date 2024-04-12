import { TCommonResult, TQuiz, TQuizResult } from 'store';

export type TInitialState = {
  quiz: TQuiz | null;

  result: TCommonResult | TQuizResult | null;
  detail: string;
  status_code: number;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  quiz: null,

  result: null,
  detail: '',
  status_code: 0,

  loading: false,
  error: false,
};
