import { AxiosError } from 'axios';
import { httpClient } from '.';
import { Groupo } from './types';

interface CustomError {
  status: number;
  statusText: string;
}

export const getInfoUser = async () => {
  let erros: CustomError | null = null;
  let data: Groupo[] | null = null;

  const userId = window.localStorage.getItem('userId');

  try {
    const response = await httpClient.get(`/user/${userId}`);

    if (response.data) {
      data = response.data.groups;
    } else {
      erros = {
        status: response.request.statusCode,
        statusText: response.request.statusText,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      erros = {
        status: error.response.status,
        statusText: error.response.statusText,
      };
    } else {
      console.error('Unexpected error:', error);
    }
  }

  return { data, erros };
};
