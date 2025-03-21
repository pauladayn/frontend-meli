import axios from 'axios';
import API_URLS from '../../config/apiConfig';
import { getAccessToken, refreshTokens } from '../Auth';

const apiClient = axios.create({
  baseURL: API_URLS.BASE,
  headers: {
    "Content-Type": "application/json",
  }
});

apiClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["Authorization"] = `Bearer APP_USR-5617113306904399-032109-0e6d288b69e773e58eab0f168783c9d6-261486947`;
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await refreshTokens(); 
      error.config.headers["Authorization"] = `Bearer APP_USR-5617113306904399-032109-0e6d288b69e773e58eab0f168783c9d6-261486947`;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);


export default apiClient;