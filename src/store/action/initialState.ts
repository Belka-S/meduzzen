import { TAction } from 'store';

export type TInitialState = {
  createActionFromUser: Pick<TAction, 'action_id'> | null;
  createActionFromCompany: Pick<TAction, 'action_id'> | null;
  acceptActionInvite: Pick<TAction, 'action_id'> | null;
  acceptActionRequest: Pick<TAction, 'action_id'> | null;
  declineAction: string;
  addToAdmin: Pick<TAction, 'action_id'> | null;
  removeFromAdmin: Pick<TAction, 'action_id'> | null;
  addToBlock: Pick<TAction, 'action_id'> | null;
  removeFromBlock: Pick<TAction, 'action_id'> | null;
  leaveFromCompany: string;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  createActionFromUser: null,
  createActionFromCompany: null,
  acceptActionInvite: null,
  acceptActionRequest: null,
  declineAction: '',
  addToAdmin: null,
  removeFromAdmin: null,
  addToBlock: null,
  removeFromBlock: null,
  leaveFromCompany: '',

  loading: false,
  error: false,
};
