import { toast } from 'react-toastify';
import { TAction } from 'store';
import * as TNK from 'store/action/actionThunks';
import { initialState, TInitialState } from 'store/action/initialState';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [
  TNK.acceptActionInviteThunk,
  TNK.acceptActionRequestThunk,
  TNK.addToAdminThunk,
  TNK.addToBlockThunk,
  TNK.createActionFromCompanyThunk,
  TNK.createActionFromUserThunk,
  TNK.declineActionThunk,
  TNK.leaveFromCompanyThunk,
  TNK.removeFromAdminThunk,
  TNK.removeFromBlockThunk,
];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// handlers
const handleActionIdSuccess = (
  _: TInitialState,
  action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
) => {
  toast.success(`Succeed with ${action.payload.result.action_id}`);
};

const handleSuccess = (
  _: TInitialState,
  action: PayloadAction<{ status_code: number }>,
) => {
  if (action.payload.status_code) toast.success(`Succeed`);
};

// const handleActionInviteSuccess = (
//   state: TInitialState,
//   action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
// ) => ({ ...state, acceptActionInvite: action.payload.result });

// const handleActionReqSuccess = (
//   state: TInitialState,
//   action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
// ) => ({ ...state, acceptActionRequest: action.payload.result });

// const handleDeclineActionSuccess = (
//   state: TInitialState,
//   action: PayloadAction<{ result: string }>,
// ) => ({ ...state, declineAction: action.payload.result });

const handleAddToAdminSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
) => ({ ...state, addToAdmin: action.payload.result });

const handleRemoveFromAdminSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
) => ({ ...state, removeFromAdmin: action.payload.result });

const handleAddToBlockSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
) => ({ ...state, addToBlock: action.payload.result });

const handleRemoveFromBlockSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TAction, 'action_id'> }>,
) => ({ ...state, removeFromBlock: action.payload.result });

const handleLeaveCompanySuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: string }>,
) => ({ ...state, leaveFromCompany: action.payload.result });

// slice
const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: { cleanActions: () => initialState },
  extraReducers: builder => {
    builder
      // success
      .addCase(TNK.createActionFromUserThunk.fulfilled, handleActionIdSuccess)
      .addCase(
        TNK.createActionFromCompanyThunk.fulfilled,
        handleActionIdSuccess,
      )
      .addCase(TNK.acceptActionInviteThunk.fulfilled, handleActionIdSuccess)
      .addCase(TNK.acceptActionRequestThunk.fulfilled, handleActionIdSuccess)
      .addCase(TNK.declineActionThunk.fulfilled, handleSuccess)
      .addCase(TNK.addToAdminThunk.fulfilled, handleAddToAdminSuccess)
      .addCase(TNK.removeFromAdminThunk.fulfilled, handleRemoveFromAdminSuccess)
      .addCase(TNK.addToBlockThunk.fulfilled, handleAddToBlockSuccess)
      .addCase(TNK.removeFromBlockThunk.fulfilled, handleRemoveFromBlockSuccess)
      .addCase(TNK.leaveFromCompanyThunk.fulfilled, handleLeaveCompanySuccess)
      // loading, error
      .addMatcher(isAnyOf(...fn('pending')), state => {
        return { ...state, loading: true, error: false };
      })
      .addMatcher(isAnyOf(...fn('fulfilled')), state => {
        return { ...state, loading: false, error: false };
      })
      .addMatcher(isAnyOf(...fn('rejected')), (state, action) => {
        return { ...state, loading: false, error: action.payload };
      });
  },
});

export const actionReducer = actionSlice.reducer;

export const { cleanActions } = actionSlice.actions;
