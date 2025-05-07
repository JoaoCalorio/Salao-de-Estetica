'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InformacoesClientes() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nomeCompleto: '',
    nascimento: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    valor: '',
    descricao: '',
  });

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token !== 'admin-token') {
      router.push('/login');
    } else {
      setLoading(false);
    }
    document.title = 'Informações do cliente';
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatarCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!validarCPF(form.cpf)) {
      setErro('CPF inválido.');
      return;
    }

    try {
      const resposta = await fetch('https://projetin-wp0d.onrender.com/cadastro', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setMensagem(data.mensagem || 'Usuário cadastrado com sucesso!');
        setForm({
          nomeCompleto: '',
          nascimento: '',
          cpf: '',
          rg: '',
          email: '',
          telefone: '',
          valor: '',
          descricao: '',
        });
      } else {
        setErro(data.erro || 'Erro ao cadastrar.');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCPF(e.target.value);
    setForm({ ...form, cpf: valorFormatado });
  };

  if (loading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Informações do cliente</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              type="text"
              name="nomeCompleto"
              value={form.nomeCompleto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
            <input
              type="date"
              name="nascimento"
              value={form.nascimento}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleCPFChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite seu CPF"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
            <input
              type="text"
              name="rg"
              value={form.rg}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite seu RG"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor gasto</label>
            <input
              type="number"
              name="valor"
              value={form.valor}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Valor gasto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              placeholder="Digite uma descrição"
            />
          </div>
          <button
            onClick={() => router.push('/homepage')}
            className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md transition-colors"
          >
            Voltar para a Home
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Cadastrar
          </button>
        </form>

        {mensagem && <p className="mt-4 text-green-600 text-center">{mensagem}</p>}
        {erro && <p className="mt-4 text-red-600 text-center">{erro}</p>}
      </div>
    </div>
  );
}
