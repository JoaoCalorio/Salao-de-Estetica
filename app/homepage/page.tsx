'use client';

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Bem-vindo, Admin</h1>

        <Link href="/cadastro">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4">
            Adicionar Cliente
          </button>
        </Link>

        <Link href="/buscacpf">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md mt-4">
            Buscar CPF
          </button>
        </Link>

        <Link href="/alterarusuario">
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md mt-4">
            Alterar Usuário
          </button>
        </Link>

        <Link href="/deletausuario">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md mt-4">
            Deletar Usuário
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
