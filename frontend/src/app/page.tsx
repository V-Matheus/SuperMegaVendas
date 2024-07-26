'use client';

import { login } from '@/services/login';
import { register } from '@/services/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    login();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const { data, erros } = await register({ email, password });

    if (erros) {
      throw new Error(`Erro: ${erros.statusText}`);
    }

    const userId = window.localStorage.getItem('userId');

    setIsLoading(false);
    router.push(`/user/${userId}`);
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-gray-700 p-16 rounded">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-6 items-start"
        >
          <h1 className="text-yellow-400 font-bold text-4xl">Cadastrar</h1>

          <label className="space-y-2">
            <h3 className="text-2xl text-gray-100">E-Mail</h3>
            <input
              className="py-2 px-4 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="johndoe@doe.com"
            />
          </label>
          <label className="space-y-2">
            <h3 className="text-2xl text-gray-100">Senha</h3>
            <input
              className="py-2 px-4 rounded"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button
            className={`py-2 px-4 rounded bg-gray-200 ${
              isLoading ? 'disabled:text-gray-500 disabled:cursor-wait' : ''
            }`}
            disabled={isLoading}
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </div>
    </main>
  );
}
