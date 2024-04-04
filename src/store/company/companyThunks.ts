import * as API from 'api/companyApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { store, TPaginationParams } from 'store';
import { createAppAsyncThunk } from 'store';
import { TCompany } from 'store';

export const createCompanyThunk = createAppAsyncThunk(
  'company/create',
  async (company: Pick<TCompany, 'is_visible' | 'company_name'>, thunkAPI) => {
    try {
      return await API.createCompany(company);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getCompanyThunk = createAppAsyncThunk(
  'company/get',
  async (params: { company_id: number }, thunkAPI) => {
    try {
      return await API.getCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteCompanyThunk = createAppAsyncThunk(
  'company/delete',
  async (params: { company_id: number }, thunkAPI) => {
    try {
      return await API.deleteCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateInfoThunk = createAppAsyncThunk(
  'company/updateInfo',
  async (company: Partial<TCompany>, thunkAPI) => {
    try {
      return await API.updateCompanyInfo(company);
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
    try {
      return await API.updateVisible(company);
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
    const company_id = store.getState().companies.company?.company_id;
    if (!company_id) return;
    try {
      return await API.updateAvatar(company_id, formData);
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
    try {
      return await API.getAllCompanies(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
