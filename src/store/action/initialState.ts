import { TAction } from 'store';

export type TInitialState = {
  result: Pick<TAction, 'action_id'> | string | null;
  detail: string;
  status_code: number;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  result: null,
  detail: '',
  status_code: 0,

  loading: false,
  error: false,
};
