import * as API from 'api/authApi';
import axios from 'axios';
import { createAppAsyncThunk } from 'store';

export const loginThunk = createAppAsyncThunk(
  'auth/token',
  async (credentials: API.IAuthCredentials, thunkAPI) => {
    try {
      return await API.login(credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  },
);
