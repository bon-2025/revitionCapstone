import axios from 'axios';

/**
 * Create an Axios instance for global configuration
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // change to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Global reusable API methods
 */
export const api = {
  get: (url, config = {}) =>
    apiClient.get(url, config).then(res => res.data),

  post: (url, data = {}, config = {}) =>
    apiClient.post(url, data, config).then(res => res.data),

  put: (url, data = {}, config = {}) =>
    apiClient.put(url, data, config).then(res => res.data),

  delete: (url, config = {}) =>
    apiClient.delete(url, config).then(res => res.data),
};
