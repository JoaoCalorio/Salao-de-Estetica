'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteUserPage() {
  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token !== 'admin-token') {
      router.push('/login');
    }
  }, [router]);

  const handleDelete = async () => {
    try {
      const resposta = await fetch(`http://localhost:3001/users/${cpf}`, {
        method: 'DELETE',
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setMensagem(data.mensagem || 'Usuário deletado com sucesso.');
        setErro('');
        setCpf('');
        setConfirmar(false);
      } else {
        setErro(data.erro || 'Erro ao deletar usuário.');
        setMensagem('');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  const formatarCPF = (valor: string) => {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 11) {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return valor;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpfFormatado = formatarCPF(e.target.value);
    setCpf(cpfFormatado);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Deletar Usuário</h1>

        <input
          type="text"
          placeholder="Digite o CPF do usuário"
          value={cpf}
          onChange={handleCPFChange}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-gray-800"
        />

        {!confirmar ? (
          <button
            disabled={!cpf}
            onClick={() => setConfirmar(true)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            Confirmar CPF para Deletar
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-red-600 text-center font-semibold">
              Tem certeza que deseja deletar o usuário com CPF {cpf}?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmar(false)}
                className="w-1/2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        )}

        {mensagem && <p className="text-green-600 mt-4 text-center">{mensagem}</p>}
        {erro && <p className="text-red-600 mt-4 text-center">{erro}</p>}

        <button
          onClick={() => router.push('/homepage')}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Voltar para a Home
        </button>
      </div>
    </div>
  );
}
