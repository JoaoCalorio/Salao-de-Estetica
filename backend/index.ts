import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_PATH = path.join(__dirname, 'data', 'usuarios.json');

app.use(cors());
app.use(bodyParser.json());

// Interface para os dados do usuário
interface Usuario {
  nomeCompleto: string;
  idade: string;
  cpf: string;
  rg: string;
  descricao: string;
}

app.post('/cadastro', (req, res) => {
  const novoUsuario: Usuario = req.body;

  console.log('Recebido no backend:', novoUsuario);

  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    }

    let usuarios: Usuario[] = [];

    try {
      if (data) usuarios = JSON.parse(data);
    } catch (parseError) {
      console.error('Erro ao parsear o arquivo:', parseError);
      return res.status(500).json({ erro: 'Erro ao processar os dados' });
    }

    // Verifica se o CPF já existe
    const cpfExistente = usuarios.some((u) => u.cpf === novoUsuario.cpf);
    if (cpfExistente) {
      return res.status(400).json({ erro: 'CPF já cadastrado' });
    }

    usuarios.push(novoUsuario);

    fs.writeFile(DATA_PATH, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar no arquivo:', err);
        return res.status(500).json({ erro: 'Erro ao salvar o arquivo' });
      }

      console.log('Usuário adicionado com sucesso!');
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
  });
});


// Endpoint para buscar um usuário pelo CPF
app.get('/cliente/:cpf', (req, res) => {
  const { cpf } = req.params;

  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    }

    let usuarios: Usuario[] = [];

    try {
      usuarios = JSON.parse(data);
    } catch (parseError) {
      console.error('Erro ao parsear o arquivo:', parseError);
      return res.status(500).json({ erro: 'Erro ao processar os dados' });
    }

    const usuario = usuarios.find((u) => {
      const cpfUsuario = u.cpf.replace(/[^\d]/g, '');
      const cpfParam = cpf.replace(/[^\d]/g, '');
      return cpfUsuario === cpfParam;
    });

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  });
});



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
