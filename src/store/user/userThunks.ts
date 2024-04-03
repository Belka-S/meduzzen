import * as API from 'api/userApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { store, TPaginationParams, TRegister } from 'store';
import { createAppAsyncThunk } from 'store';
import { TPassword, TUser } from 'store';

export const registerThunk = createAppAsyncThunk(
  'users/register',
  async (credentials: TRegister, thunkAPI) => {
    try {
      return await API.register(credentials);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getMeThunk = createAppAsyncThunk(
  'auth/login',
  async (_, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.getMe(access_token);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getUserThunk = createAppAsyncThunk(
  'users/get',
  async (params: { user_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.getUser(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteUserThunk = createAppAsyncThunk(
  'users/delete',
  async (params: { user_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.deleteUser(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateInfoThunk = createAppAsyncThunk(
  'users/updateInfo',
  async (user: Partial<TUser>, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.updateUserInfo(access_token, user);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updatePasswordThunk = createAppAsyncThunk(
  'users/updatePassword',
  async (user: TPassword, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.updatePassword(access_token, user);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateAvatarThunk = createAppAsyncThunk(
  'users/updateAvatar',
  async (formData: FormData, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    const user_id = store.getState().users.user?.user_id;
    if (!user_id) return;
    try {
      return await API.updateAvatar(access_token, user_id, formData);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAllUsersThunk = createAppAsyncThunk(
  'users/getAll',
  async (params: TPaginationParams, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.getAllUsers(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
