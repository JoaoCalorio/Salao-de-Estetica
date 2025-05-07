'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (usuario === 'admin' && senha === 'teste123') {
      // Armazena o token no localStorage (simples e eficaz para apps client-side)
      localStorage.setItem('authToken', 'admin-token');

      // Redireciona para a homepage
      router.push('/homepage');
    } else {
      setErro('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 text-black">
        <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-700 placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-700 placeholder-gray-400"
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Entrar
        </button>

        {erro && <p className="text-red-500 mt-4">{erro}</p>}
      </form>
    </div>
  );
}
