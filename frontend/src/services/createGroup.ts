import { ApiError } from 'next/dist/server/api-utils';
import { httpClient } from '.';
import { CreateGroupResponse } from './types';

interface CreateGroupParams {
  name: string;
  userId: string | string[];
}

export const createGroup = async ({ name, userId }: CreateGroupParams) => {
  let erros: ApiError | null = null;
  let data: CreateGroupResponse | null = null;

  const response = await httpClient.post<CreateGroupResponse>('/groups', {
    name,
    userId,
  });

  if (response.data) {
    data = response.data;
  } else {
    erros = {
      status: response.request.statusCode,
      statusText: response.request.message,
    };
  }

  return { data, erros };
};
