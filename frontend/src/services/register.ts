import { AxiosInstance } from 'axios';
import { httpClient } from '.';

interface RegisterParams {
  email: string;
  password: string;
}

export const register = async ({ email, password }: RegisterParams) => {
  let erros = null;
  const response = await httpClient.post('/user', {
    email,
    password,
  });

  window.localStorage.setItem('userId', response.data.id);

  if (!response.data) {
    erros = {
      status: response.request.statusCode,
      statusText: response.request.message,
    };
  }

  return { data: response.data, erros };
};
