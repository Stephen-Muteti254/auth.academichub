import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://api.academichubpro.com/api/v1';
  // import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;