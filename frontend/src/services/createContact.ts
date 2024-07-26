import { ApiError } from 'next/dist/server/api-utils';
import { httpClient } from '.';
import { CreateContactResponse } from './types';

interface CreateContactParams {
  name: string;
  phoneNumber: string;
}

export const createContact = async (contactList: CreateContactParams[]) => {
  let erros: ApiError | null = null;
  let data: CreateContactResponse[] = [];

  const groupId = window.localStorage.getItem('groupId');

  try {
    const responses = await Promise.all(
      contactList.map(async (contact) => {
        try {
          const response = await httpClient.post<CreateContactResponse>('/contacts', {
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            groupId,
          });
          return response.data;
        } catch (error) {
          console.error('Erro ao criar contato:', error);
          return null;
        }
      })
    );

    data = responses.filter((response): response is CreateContactResponse => response !== null);

  } catch (error) {
    erros = {
      status: (error as any).response?.status || 500,
      statusText: (error as any).response?.statusText || 'Erro desconhecido',
    };
  }

  return { data, erros };
};
