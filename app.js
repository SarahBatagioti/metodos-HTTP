const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configuração do Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Simulando dados de tarefas
let tarefas = [
  { id: 1, nome: 'João', email: 'joao@gmail.com', status: false },
  { id: 2, nome: 'Maria', email: 'maria@gmail.com', status: true }
];
let nextId = 3;

// Rota para exibir a lista de tarefas
app.get('/', (req, res) => {
  res.render('index', { tarefas });
});

// Rota para exibir tarefas com base no status
app.get('/tarefas', (req, res) => {
  const status = req.query.status; // Obtém o valor do status da query string
  let tarefasFiltradas;

  if (status === 'true') {
    tarefasFiltradas = tarefas.filter(t => t.status === true);
  } else if (status === 'false') {
    tarefasFiltradas = tarefas.filter(t => t.status === false);
  } else {
    tarefasFiltradas = tarefas; // Se nenhum status for fornecido, retorna todas as tarefas
  }

  res.render('index', { tarefas: tarefasFiltradas });
});

// Rota para adicionar um novo tarefa
app.post('/tarefas', (req, res) => {
  const { nome } = req.body; 
  if (!nome) {
    return res.status(400).send('Nome é obrigatório.');
  }

  const tarefaExistente = tarefas.find(t => t.nome.toLowerCase() === nome.toLowerCase());

  if (tarefaExistente) {
    return res.render('form', { erro: 'Uma tarefa com esse nome já existe.' });
  }

  const novoTarefa = { id: nextId++, nome, status: false };
  tarefas.push(novoTarefa);
  res.redirect('/');
});

// Rota para exibir o formulário de criação
app.get('/tarefas/novo', (req, res) => {
  res.render('form', { erro: null });
});

// Rota para exibir o formulário de edição de uma tarefa
app.get('/tarefas/editar/:id', (req, res) => {
  const tarefaId = parseInt(req.params.id);
  const tarefa = tarefas.find(c => c.id === tarefaId);
  res.render('edit', { tarefa, erro: null });
});

// Rota para atualizar uma tarefa
app.post('/tarefas/editar/:id', (req, res) => {
  const tarefaId = parseInt(req.params.id);
  const { nome, status } = req.body;
  const tarefa = tarefas.find(c => c.id === tarefaId);
  
  const tarefaExistente = tarefas.find(t => t.nome.toLowerCase() === nome.toLowerCase() && t.id !== tarefaId);

  if (tarefaExistente) {
    return res.render('edit', { tarefa, erro: 'Uma tarefa com esse nome já existe.' });
  }

  if (tarefa) {
    tarefa.nome = nome;
    tarefa.status = status === 'on';
  }
  
  res.redirect('/');
});

// Rota para excluir uma tarefa
app.post('/tarefas/deletar/:id', (req, res) => {
  const tarefaId = parseInt(req.params.id);
  tarefas = tarefas.filter(c => c.id !== tarefaId);
  res.redirect('/');
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
