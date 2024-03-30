import * as API from 'api/companyApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { store, TPaginationParams } from 'store';
import { createAppAsyncThunk } from 'store';
import { TCompany } from 'store';

export const createCompanyThunk = createAppAsyncThunk(
  'company/register',
  async (
    credentials: Pick<TCompany, 'is_visible' | 'company_name'>,
    thunkAPI,
  ) => {
    try {
      return await API.createCompany(credentials);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getCompanyThunk = createAppAsyncThunk(
  'company/get',
  async (id: number, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      if (access_token) {
        return await API.getCompany(access_token, id);
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteCompanyThunk = createAppAsyncThunk(
  'company/delete',
  async (id: number, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      if (access_token) {
        return await API.deleteCompany(access_token, id);
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateInfoThunk = createAppAsyncThunk(
  'company/updateInfo',
  async (company: Partial<TCompany>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      if (access_token) {
        return await API.updateCompanyInfo(access_token, company);
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateVisibleThunk = createAppAsyncThunk(
  'company/updatePassword',
  async (company: Pick<TCompany, 'is_visible' | 'company_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      if (access_token) {
        return await API.updateVisible(access_token, company);
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateAvatarThunk = createAppAsyncThunk(
  'company/updateAvatar',
  async (formData: FormData, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    const company_id = store.getState().companies.company?.company_id;
    try {
      if (access_token && company_id) {
        return await API.updateAvatar(access_token, company_id, formData);
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAllCompaniesThunk = createAppAsyncThunk(
  'company/getAll',
  async (params: TPaginationParams, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      if (access_token) {
        return await API.getAllCompanies(access_token, params);
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
