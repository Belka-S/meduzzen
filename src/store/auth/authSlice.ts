import { TAuth } from 'store';
import * as TNK from 'store/auth/authThunks';
import { initialState, TInitialStae } from 'store/auth/inititalState';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [TNK.loginThunk];

type TState = 'pending' | 'fulfilled' | 'rejected';
const fn = (state: TState) => thunkArr.map(el => el[state]);

// handlers
const handleLoginSuccess = (
  state: TInitialStae,
  action: PayloadAction<{ result: TAuth }>,
) => {
  state.token = action.payload.result;
};

// slice
const authSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    login: handleLoginSuccess,
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      // success
      .addCase(TNK.loginThunk.fulfilled, handleLoginSuccess)
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

export const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;
