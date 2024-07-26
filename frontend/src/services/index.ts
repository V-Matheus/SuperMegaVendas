import axios from 'axios';

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3333',
};

export const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.response.use(
  (response) => {
    const userId = window.localStorage.getItem('userId');

    if (userId) {
      window.location.href = '/';
    }

    return response;
  },
  (error) => {
    const canThrowAnError =
      error.request?.status === 0 || error.request?.status === 500;

    if (canThrowAnError) {
      throw new Error(error.message);
    }

    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    
    if (error.response?.status === 409) {
      if (canThrowAnError) {
        throw new Error(error.message);
      }
    }

    return error;
  },
);
