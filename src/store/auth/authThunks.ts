import * as API from 'api/authApi';
import axios from 'axios';
import { store } from 'store';
import { createAppAsyncThunk } from 'store';
import { TUser } from 'store/user';

export const authThunk = createAppAsyncThunk(
  'auth/token',
  async (credentials: Partial<TUser>, thunkAPI) => {
    try {
      return await API.auth(credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);

export const loginThunk = createAppAsyncThunk(
  'auth/login',
  async (_, thunkAPI) => {
    const { access_token } = store.getState().auth.user;
    try {
      if (access_token) {
        return await API.login(access_token);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);

export const registerThunk = createAppAsyncThunk(
  'users/register',
  async (credentials: Partial<TUser>, thunkAPI) => {
    try {
      return await API.register(credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);
