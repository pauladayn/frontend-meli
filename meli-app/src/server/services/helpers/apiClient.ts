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
  config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await refreshTokens(); 
      error.config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);


export default apiClient;