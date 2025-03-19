import axios from 'axios';
import 'dotenv/config';
import API_URLS from '../../config/apiConfig';


const apiClient = axios.create({
  baseURL: API_URLS.BASE,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.VITE_ACCESS_TOKEN}`
  }
})

export default apiClient;