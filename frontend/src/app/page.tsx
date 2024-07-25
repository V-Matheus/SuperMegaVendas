export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-gray-700 p-16 rounded">
        <form className="flex flex-col space-y-6 items-start">
          <h1 className="text-yellow-400 font-bold text-4xl">Login</h1>
          <label className="space-y-2">
            <h3 className="text-2xl text-gray-100">E-Mail</h3>
            <input
              className="py-2 px-4 rounded"
              type="email"
              required
              placeholder="johndoe@doe.com"
            />
          </label>
          <label className="space-y-2">
            <h3 className="text-2xl text-gray-100">Senha</h3>
            <input className="py-2 px-4 rounded" type="password" required />
          </label>
          <button className="py-2 px-4 rounded bg-gray-200" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
