import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;
const DATA_PATH = path.join(__dirname, 'data', 'usuarios.json');

app.use(cors());
app.use(bodyParser.json());

// Interface para os dados do usuário
interface Usuario {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  nascimento: string;
}

// Endpoint para cadastro
app.post('/cadastro', (req, res) => {
  const novoUsuario: Usuario = req.body;

  console.log('Recebido no backend:', novoUsuario); // Log dos dados recebidos

  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err); // Log de erro ao ler o arquivo
      return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    }

    let usuarios: Usuario[] = [];

    try {
      usuarios = JSON.parse(data); // Parse do arquivo JSON
    } catch (parseError) {
      console.error('Erro ao parsear o arquivo:', parseError); // Log de erro no parse
      return res.status(500).json({ erro: 'Erro ao processar os dados' });
    }

    usuarios.push(novoUsuario); // Adiciona o novo usuário ao array de usuários

    fs.writeFile(DATA_PATH, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar no arquivo:', err); // Log de erro ao escrever no arquivo
        return res.status(500).json({ erro: 'Erro ao salvar o arquivo' });
      }

      console.log('Usuário adicionado com sucesso!'); // Log de sucesso ao salvar
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
  });
});

// Endpoint para login
app.post('/login', (req, res) => {
  const { email, senha }: { email: string; senha: string } = req.body;

  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err); // Log de erro ao ler o arquivo
      return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
    }

    let usuarios: Usuario[] = [];

    try {
      usuarios = JSON.parse(data); // Parse do arquivo JSON
    } catch (parseError) {
      console.error('Erro ao parsear o arquivo:', parseError); // Log de erro no parse
      return res.status(500).json({ erro: 'Erro ao processar os dados' });
    }

    const usuarioEncontrado = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuarioEncontrado) {
      console.log('Login realizado com sucesso!'); // Log de sucesso ao fazer login
      res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
    } else {
      console.log('Usuário ou senha incorretos'); // Log de erro ao fazer login
      res.status(401).json({ erro: 'Usuário ou senha incorretos' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
