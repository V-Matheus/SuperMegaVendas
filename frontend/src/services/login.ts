import { httpClient } from '.';

interface LoginParams {
  email: string;
  password: string;
}

export const login = async () => {
  let erros = null;
  const userId = window.localStorage.getItem('userId');
  window.location.href = `/user/${userId}`;

  if (!userId) window.location.href = '/';

  const response = await httpClient.get(`/users/${userId}`);

  if (!response.data) {
    erros = {
      status: response.request.status,
      statusText: response.request.statusText,
    };
  }

  return { data: response.data, erros };
};
