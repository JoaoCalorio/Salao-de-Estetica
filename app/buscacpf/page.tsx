'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function BuscarCliente() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função para calcular a idade
  const calcularIdade = (dataNascimento: string): number => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth();
    const dia = hoje.getDate();

    if (mes < nascimento.getMonth() || (mes === nascimento.getMonth() && dia < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const buscar = async () => {
    setErro('');
    setUsuario(null);
    setCarregando(true);

    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    if (cpfLimpo.length !== 11) {
      setErro('CPF inválido');
      setCarregando(false);
      return;
    }

    try {
      const resposta = await fetch(`https://projetin-nal5.onrender.com/buscacpf/${cpfLimpo}`);
      const data = await resposta.json();

      if (resposta.ok) {
        // Calculando a idade a partir da data de nascimento
        const idade = data.nascimento ? calcularIdade(data.nascimento) : 0;
        // Adicionando a idade ao usuário
        setUsuario({ ...data, idade });
      } else {
        setErro(data.erro || 'Usuário não encontrado');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Buscar Cliente por CPF</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite o CPF do cliente"
            />
          </div>
          <button
            onClick={() => router.push('/homepage')}
            className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md transition-colors"
          >
            Voltar para a Home
          </button>
          <button
            onClick={buscar}
            disabled={carregando}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            {carregando ? 'Buscando...' : 'Buscar'}
          </button>
          

          

          {erro && <p className="mt-4 text-red-600 text-center">{erro}</p>}

          {usuario && (
            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Dados do Cliente</h2>
              <p className="text-nome font-semibold text-gray-700 mb-2"><strong>Nome:</strong> {usuario.nomeCompleto}</p>
              <p className="text-idade font-semibold text-gray-700 mb-2"><strong>Idade:</strong> {usuario.idade}</p>
              <p className="text-cpf font-semibold text-gray-700 mb-2"><strong>CPF:</strong> {usuario.cpf}</p>
              <p className="text-rg font-semibold text-gray-700 mb-2"><strong>RG:</strong> {usuario.rg}</p>
              <p className="text-desc font-semibold text-gray-700 mb-2"><strong>Descrição:</strong> {usuario.descricao}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
