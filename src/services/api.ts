import axios, {type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Important: Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth tokens here if needed (in addition to cookies)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Redirect to login if unauthorized
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export default api;