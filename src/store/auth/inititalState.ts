import { TAuth } from 'store';

export type TInitialStae = {
  token: TAuth | null;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialStae = {
  token: null,

  loading: false,
  error: false,
};
