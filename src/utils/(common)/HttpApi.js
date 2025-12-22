// utils/api.js
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
 * Utility to ensure a minimum loading time
 * @param {Promise} promise - Axios request promise
 * @param {number} minTime - Minimum time in ms
 * @returns {Promise<any>}
 */
const withMinLoading = async (promise, minTime = 2000) => {
  const start = Date.now();
  const result = await promise;
  const elapsed = Date.now() - start;
  const remaining = minTime - elapsed;
  if (remaining > 0) await new Promise(resolve => setTimeout(resolve, remaining));
  return result;
};

/**
 * Global reusable API methods with configurable minimum loading time
 */
export const api = {
  get: (url, config = {}, minLoadingTime = 20) =>
    withMinLoading(apiClient.get(url, config).then(res => res.data), minLoadingTime),

  post: (url, data = {}, config = {}, minLoadingTime = 2000) =>
    withMinLoading(apiClient.post(url, data, config).then(res => res.data), minLoadingTime),

  put: (url, data = {}, config = {}, minLoadingTime = 2000) =>
    withMinLoading(apiClient.put(url, data, config).then(res => res.data), minLoadingTime),

  delete: (url, config = {}, minLoadingTime = 2000) =>
    withMinLoading(apiClient.delete(url, config).then(res => res.data), minLoadingTime),
};
