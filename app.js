const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuração do Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Simulando dados de clientes
let clientes = [
  { id: 1, nome: 'João', email: 'joao@gmail.com', status: false },
  { id: 2, nome: 'Maria', email: 'maria@gmail.com', status: true }
];

let nextId = 3;

// Rota para exibir a lista de clientes
app.get('/', (req, res) => {
  res.render('index', { clientes });
});

// Rota para exibir o formulário de criação
app.get('/clientes/novo', (req, res) => {
  res.render('form');
});

// Rota para adicionar um novo cliente
app.post('/clientes', (req, res) => {
  const { nome, email } = req.body;
  const novoCliente = { id: nextId++, nome, email, status: false };
  clientes.push(novoCliente);
  res.redirect('/');
});

// Rota para exibir o formulário de edição de um cliente
app.get('/clientes/editar/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === clienteId);
  res.render('edit', { cliente });
});

// Rota para atualizar um cliente
app.post('/clientes/editar/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const { nome, email, status } = req.body;
  const cliente = clientes.find(c => c.id === clienteId);

  if (cliente) {
    cliente.nome = nome;
    cliente.email = email;
    cliente.status = status === 'on';
  }

  res.redirect('/');
});

// Rota para excluir um cliente
app.post('/clientes/deletar/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  clientes = clientes.filter(c => c.id !== clienteId);
  res.redirect('/');
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
