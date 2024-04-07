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
    try {
      return await API.getMe();
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
    try {
      return await API.getUser(params);
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
    try {
      return await API.deleteUser(params);
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
    try {
      return await API.updateUserInfo(user);
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
    try {
      return await API.updatePassword(user);
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
    const user_id = store.getState().users.user?.user_id;
    if (!user_id) return;
    try {
      return await API.updateAvatar(user_id, formData);
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
    try {
      return await API.getAllUsers(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
