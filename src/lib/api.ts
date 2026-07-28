import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.academichubpro.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  xsrfCookieName: "csrf_access_token",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

api.interceptors.request.use(
  (config) => {

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    const match = document.cookie.match(
        /(?:^|;\s*)csrf_access_token=([^;]+)/
    );

    if (match) {
        config.headers["X-CSRF-TOKEN"] = decodeURIComponent(match[1]);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;