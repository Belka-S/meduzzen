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

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// handlers
const handleActionSuccess = (
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
      .addCase(TNK.createActionFromUserThunk.fulfilled, handleActionSuccess)
      .addCase(TNK.createActionFromCompanyThunk.fulfilled, handleActionSuccess)
      .addCase(TNK.acceptActionInviteThunk.fulfilled, handleActionSuccess)
      .addCase(TNK.acceptActionRequestThunk.fulfilled, handleActionSuccess)
      .addCase(TNK.declineActionThunk.fulfilled, handleActionSuccess)
      .addCase(TNK.addToAdminThunk.fulfilled, handleActionSuccess)
      .addCase(TNK.removeFromAdminThunk.fulfilled, handleActionSuccess)
      // .addCase(TNK.addToBlockThunk.fulfilled, handleAddToBlockSuccess)
      // .addCase(TNK.removeFromBlockThunk.fulfilled, handleRemoveFromBlockSuccess)
      .addCase(TNK.leaveCompanyThunk.fulfilled, handleActionSuccess)
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
