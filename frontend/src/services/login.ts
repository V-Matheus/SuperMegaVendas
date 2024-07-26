import { AxiosInstance } from 'axios';
import { httpClient } from '.';

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  let erros = null;
  const id = window.localStorage.getItem('id');

  const response = await httpClient.post(`/users/${id}`, {
    email,
    password,
  });

  if (!response.data) {
    erros = {
      status: response.request.status,
      statusText: response.request.statusText,
    };
  }

  return { data: response.data, erros };
};
