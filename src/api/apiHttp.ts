import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from 'store';

// base URL
const baseURL = import.meta.env.VITE_PROD_BACK_HTTP;

// axios instance
const apiClient = axios.create({ baseURL });
const apiClientToken = axios.create({ baseURL });

// request interseptor
apiClientToken.interceptors.request.use(
  config => {
    const acessToken = store.getState().auth.token?.access_token;
    config.headers['Authorization'] = `Bearer ${acessToken}`;
    return config;
  },
  err => {
    toast.error(err.response.data.detail);
    return Promise.reject(err);
  },
);

// response interseptor
apiClient.interceptors.response.use(
  res => {
    // const { detail, result } = res.data; toast.success(!result.user_id  && detail);
    return res;
  },
  async err => {
    toast.error(err.response.data.detail);
    return Promise.reject(err);
  },
);

// set token
const token = {
  set(token: string) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    apiClient.defaults.headers.common.Authorization = '';
  },
};

export { apiClient, apiClientToken, baseURL, token };
