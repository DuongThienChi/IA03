import axios from 'axios';

// Default to same-origin /api so HTTPS frontends can reverse proxy without mixed-content.
const baseURL = import.meta.env.VITE_API_URL ?? '/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});
