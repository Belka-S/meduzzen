import * as API from 'api/userApi';
import axios from 'axios';
import { createAppAsyncThunk } from 'store';

// auth
export const registerThunk = createAppAsyncThunk(
  'auth/register',
  async (credentials: API.TCredentials, thunkAPI) => {
    try {
      return await API.register(credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);

export const loginThunk = createAppAsyncThunk(
  'auth/login',
  async (credentials: API.TCredentials, thunkAPI) => {
    try {
      return await API.login(credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);
