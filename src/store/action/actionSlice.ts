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
  TNK.leaveCompanyThunk,
  TNK.removeFromAdminThunk,
  TNK.removeFromBlockThunk,
];

type TState = 'pending' | 'fulfilled' | 'rejected';
const fn = (state: TState) => thunkArr.map(el => el[state]);

// handlers
const handleResultSuccess = (
  state: TInitialState,
  action: PayloadAction<{
    result: Pick<TAction, 'action_id'> | string | null;
    detail: string;
    status_code: number;
  }>,
) => {
  const { result, detail, status_code } = action.payload;
  status_code < 300 ? toast.success(detail) : toast.error(detail);
  state.result = result;
};

// slice
const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: { cleanActions: () => initialState },
  extraReducers: builder => {
    builder
      // success
      .addCase(TNK.createActionFromUserThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.createActionFromCompanyThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.acceptActionInviteThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.acceptActionRequestThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.declineActionThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.addToAdminThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.removeFromAdminThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.leaveCompanyThunk.fulfilled, handleResultSuccess)
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
