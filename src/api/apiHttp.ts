import axios from 'axios';
import { toast } from 'react-toastify';

// base URL
const baseURL = import.meta.env.VITE_PROD_BACK_HTTP;

// axios instance
const apiClient = axios.create({ baseURL });

// set token
const token = {
  set(token: string) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    apiClient.defaults.headers.common.Authorization = '';
  },
};

// response interseptor
apiClient.interceptors.response.use(
  res => {
    // const { detail, result } = res.data;
    // toast.success(!result.user_id  && detail);
    return res;
  },
  async err => {
    toast.error(err.response.data.detail);
    return Promise.reject(err);
  },
);

export { apiClient, baseURL, token };
