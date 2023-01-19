import axios, { AxiosRequestConfig } from 'axios';
import { storedToken } from '../store/accessToken';
import { getUserNewToken } from './userService';

axios.defaults.withCredentials = true;

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers = {
        Authorization:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoMDk5WXRycE5FTUZGM0t5OUgwVWl3PT0iLCJqdGkiOiJ1RkFFaVVwZnVmdE1KN3l5WE5KRkdnPT0iLCJyb2xlcyI6IlNFTExFUiIsImlhdCI6MTY3NDEyODUyNywiZXhwIjoxNjc0MTMwMzI3fQ.SsYREMN3JbUUsdOo_g__dRmbw4YY9Nj_khwZ3G5IY_4',
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);
    console.log(error.config);
    await getUserNewToken();
    // await getSellerNewToken()
    return Promise.reject(error);
  }
);
