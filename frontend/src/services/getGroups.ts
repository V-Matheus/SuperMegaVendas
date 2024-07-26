import { ApiError } from 'next/dist/server/api-utils';
import { httpClient } from '.';
import { Groupo } from './types';

export const getGroups = async (userId: string | null) => {
  let erros: ApiError | null = null;
  let data: Groupo[] | null = null;

  const response = await httpClient.get(`/user/${userId}`);
  
  if (response.data) {
    data = response.data.groups;
  } else {
    erros = {
      status: response.request.statusCode,
      statusText: response.request.statusText,
    };
  }

  return { data, erros };
};
