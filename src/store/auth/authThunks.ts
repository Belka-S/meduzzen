import * as API from 'api/authApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createAppAsyncThunk } from 'store';

export const loginThunk = createAppAsyncThunk(
  'auth/token',
  async (credentials: API.IAuthCredentials, thunkAPI) => {
    try {
      return await API.login(credentials);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
