
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${token}`
  },
});

export default axiosInstance;
              