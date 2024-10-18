# Gerenciamento de Tarefas - CRUD com Express.js e EJS

Este projeto é uma API simples para gerenciar tarefas, usando **Express.js** no Back-End e **EJS** no Front-End. A aplicação realiza operações CRUD: Criar, Ler, Atualizar e Deletar tarefas.

## Pré-requisitos

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/SarahBatagioti/metodos-HTTP
   cd gerenciamento-de-tarefas
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   node app.js
   ```

4. Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```bash
.
├── views/
│   ├── index.ejs        # Lista de tarefas
│   ├── form.ejs         # Formulário para nova tarefa
│   └── edit.ejs         # Formulário para editar tarefa
├── app.js               # Arquivo principal da aplicação
└── package.json         # Dependências do projeto
```

## Rotas Disponíveis

- **GET /tarefas**: Retorna todas as tarefas.
- **POST /tarefas**: Adiciona uma nova tarefa.
- **PUT /tarefas/:id**: Atualiza uma tarefa pelo ID.
- **DELETE /tarefas/:id**: Remove uma tarefa pelo ID.
- **GET /tarefas?status=true/false**: Filtra tarefas por status.

## Teste das Rotas

Use Insomnia ou Postman para testar as rotas:

1. **GET /tarefas**: Para listar todas as tarefas.
2. **POST /tarefas**: Para adicionar uma tarefa. Exemplo de corpo:

   ```json
   {
     "nome": "Nova Tarefa"
   }
   ```

3. **PUT /tarefas/:id**: Para atualizar uma tarefa. Exemplo de corpo:

   ```json
   {
     "nome": "Tarefa Atualizada",
     "status": true
   }
   ```

4. **DELETE /tarefas/:id**: Para deletar uma tarefa.

## Validações

- Tarefa com nome duplicado não pode ser criada.
- ID inválido retorna erro ao tentar atualizar ou deletar uma tarefa.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **EJS**
- **Body-Parser**
