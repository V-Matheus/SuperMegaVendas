import { AxiosInstance } from 'axios';
import { httpClient } from '.';

export const getGroups = async (userId: string | string[]) => {
  let erros = null;
  const response = await httpClient.get(`/user/${userId}`);

  if (!response.data) {
    erros = {
      status: response.request.statusCode,
      statusText: response.request.message,
    };
  }

  return { data: response.data, erros };
};
