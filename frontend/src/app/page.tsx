'use client';

import { login } from '@/services/login';
import { register } from '@/services/register';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginPage, setIsLoginPage] = useState(true);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoginPage) {
      login({ email, password });
    } else {
      const { data, erro } = register({ email, password });
    }
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-gray-700 p-16 rounded">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-6 items-start"
        >
          {isLoginPage ? (
            <h1 className="text-yellow-400 font-bold text-4xl">Login</h1>
          ) : (
            <h1 className="text-yellow-400 font-bold text-4xl">Cadastrar</h1>
          )}

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
          <Button className="py-2 px-4 rounded bg-gray-200" type="submit">
            Enviar
          </Button>
          {isLoginPage ? (
            <span
              onClick={() => setIsLoginPage(false)}
              className="text-sky-400 hover:underline hover:cursor-pointer"
            >
              Cadastre-se Aqui!
            </span>
          ) : (
            <span
              onClick={() => setIsLoginPage(true)}
              className="text-sky-400 hover:underline hover:cursor-pointer"
            >
              Faça Login Aqui!
            </span>
          )}
        </form>
      </div>
    </main>
  );
}
