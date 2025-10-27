import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://api.localhost';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});
