import axios from "axios";
import apiClient from "./apiClient.js";
 const request = async (method: string, url: string, params = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      ...params
    });
    return response.data;
  } catch (error) {
    console.error('Error during API request:', error);
    if(axios.isAxiosError(error)){
      throw new Error(error.response?.data?.message || 'Error from Mercado Libre API');
    }else {
      throw new Error('An unknown error occurred');
    }
  }
};

export default request;