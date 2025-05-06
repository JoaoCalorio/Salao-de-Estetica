'use client'; // Indica que este componente deve ser renderizado no lado do cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(''); // Limpa a mensagem de erro

    if (email === 'admin' && senha === 'teste123') {
      // Armazenar o token fictício
      localStorage.setItem('authToken', 'admin-token');
      router.push('/homepage'); // Redireciona para a homepage
    } else {
      setErro('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Entrar
          </button>

          {erro && <p className="mt-4 text-red-600 text-center">{erro}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
