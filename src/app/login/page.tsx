'use client';

import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    document.title = 'Login - Meu App';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login enviado:', form);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Caso o login seja bem-sucedido
        setMensagem('Login realizado com sucesso!');
        setErro('');
        setForm({ email: '', senha: '' });
      } else {
        // Caso o login falhe (usuário ou senha incorretos)
        setErro(data.erro || 'Erro desconhecido');
        setMensagem('');
      }
    } catch (error) {
      console.error('Erro ao tentar realizar o login:', error);
      setErro('Erro ao conectar ao servidor');
      setMensagem('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Entrar
          </button>
        </form>
        {mensagem && (
          <p className="mt-4 text-green-600 text-center font-medium">{mensagem}</p>
        )}
        {erro && (
          <p className="mt-4 text-red-600 text-center font-medium">{erro}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?
            <a
              href="/cadastro"
              className="ml-1 text-blue-600 hover:underline font-medium"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
