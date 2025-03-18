import apiClient from "./apiClient.js";
 const request = async (method, url, params = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      ...params
    });
    return response.data;
  } catch (error) {
    console.error('Error during API request:', error);
    throw new Error(error.response?.data?.message || 'Error from Mercado Libre API');
  }
};

export default request;