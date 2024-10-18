const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Configuração do Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method')); // Middleware para suportar PUT e DELETE

// Simulando dados de tarefas
let tarefas = [
  { id: 1, nome: 'Comprar pão', status: false },
  { id: 2, nome: 'Estudar Express.js', status: true }
];

let nextId = 3;

// Rota para exibir a lista de tarefas, com filtragem por status
app.get('/', (req, res) => {
  const { status } = req.query;
  
  let tarefasFiltradas = tarefas;
  
  if (status !== undefined) {
    const filtroStatus = status === 'true';
    tarefasFiltradas = tarefas.filter(t => t.status === filtroStatus);
  }

  res.render('index', { tarefas: tarefasFiltradas });
});

// Rota para exibir o formulário de criação
app.get('/tarefas/nova', (req, res) => {
  res.render('form', { error: null }); // Passar erro como null inicialmente
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { nome } = req.body;

  // Verificar se a tarefa já existe
  const tarefaExistente = tarefas.find(t => t.nome.toLowerCase() === nome.toLowerCase());

  if (tarefaExistente) {
    // Redirecionar para o formulário com um erro
    return res.render('form', { error: 'Tarefa já existe! Escolha um nome diferente.' });
  }

  const novaTarefa = { id: nextId++, nome, status: false };
  tarefas.push(novaTarefa);
  res.redirect('/');
});

// Rota para exibir o formulário de edição de uma tarefa
app.get('/tarefas/editar/:id', (req, res) => {
  const tarefaId = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === tarefaId);
  res.render('edit', { tarefa });
});

// Rota para atualizar uma tarefa (PUT)
app.put('/tarefas/:id', (req, res) => {
  const tarefaId = parseInt(req.params.id);
  const { nome, status } = req.body;
  const tarefa = tarefas.find(t => t.id === tarefaId);

  if (tarefa) {
    tarefa.nome = nome;
    tarefa.status = status === 'on';
  }

  res.redirect('/');
});

// Rota para excluir uma tarefa (DELETE)
app.delete('/tarefas/:id', (req, res) => {
  const tarefaId = parseInt(req.params.id);
  tarefas = tarefas.filter(t => t.id !== tarefaId);
  res.redirect('/');
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
