'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AlterarUsuarioPage() {
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const buscarUsuario = async () => {
    try {
      const res = await fetch(`http://localhost:3001/user/${cpf}`);
      const data = await res.json();

      if (res.ok) {
        setUsuario(data);
        setErro('');
      } else {
        setErro(data.erro || 'Erro ao buscar usuário.');
        setUsuario(null);
      }
    } catch {
      setErro('Erro ao conectar com o servidor.');
      setUsuario(null);
    }
  };

  const atualizarUsuario = async () => {
    try {
      const res = await fetch(`http://localhost:3001/user/v1/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem(data.mensagem || 'Usuário atualizado com sucesso.');
        setErro('');
      } else {
        setErro(data.erro || 'Erro ao atualizar usuário.');
      }
    } catch {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  const formatarCPF = (valor: string) => {
    valor = valor.replace(/\D/g, '');
    return valor.length <= 11 ? valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : valor;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-black">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Alterar Usuário</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(formatarCPF(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded text-gray-800"
          />
          <button
            onClick={buscarUsuario}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-2 rounded"
          >
            Buscar Usuário
          </button>
        </div>

        {usuario && (
          <div className="space-y-4">
            <input
              type="text"
              value={usuario.nomeCompleto}
              onChange={(e) => setUsuario({ ...usuario, nomeCompleto: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nome Completo"
            />
            <input
              type="date"
              value={usuario.dataNascimento || ''}
              onChange={(e) => setUsuario({ ...usuario, dataNascimento: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Data de Nascimento"
            />
            <input
              type="email"
              value={usuario.email || ''}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="E-mail"
            />
            <input
              type="text"
              value={usuario.valor || ''}
              onChange={(e) => setUsuario({ ...usuario, valor: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Valor"
            />
            <input
              type="text"
              value={usuario.rg}
              onChange={(e) => setUsuario({ ...usuario, rg: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="RG"
            />
            <textarea
              value={usuario.descricao}
              onChange={(e) => setUsuario({ ...usuario, descricao: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Descrição"
            />
            <button
              onClick={atualizarUsuario}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded"
            >
              Salvar Alterações
            </button>
          </div>
        )}

        {mensagem && <p className="text-green-600 mt-4 text-center">{mensagem}</p>}
        {erro && <p className="text-red-600 mt-4 text-center">{erro}</p>}

        <button
          onClick={() => router.push('/homepage')}
          className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
        >
          Voltar para a Home
        </button>
      </div>
    </div>
  );
}
