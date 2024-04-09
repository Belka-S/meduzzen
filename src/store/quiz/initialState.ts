import { TCommonResult, TQuiz } from 'store';

export type TInitialState = {
  quiz: TQuiz | null;
  answers: { [key: string]: string } | null;

  result: TCommonResult;
  detail: string;
  status_code: number;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  quiz: null,
  answers: null,

  result: null,
  detail: '',
  status_code: 0,

  loading: false,
  error: false,
};
