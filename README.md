# API de Lista de Tarefas

## Instalação
1. Clone o repositório
2. Execute `npm install` para instalar as dependências

## Uso
1. Execute `npm start` para iniciar o servidor.
2. Use ferramentas como Insomnia ou Thunder Client para fazer as requisições às rotas abaixo.

## Rotas
- `GET /tarefas`: Retorna todas as tarefas
- `POST /tarefas`: Adiciona uma nova tarefa
- `PUT /tarefas/:id`: Atualiza uma tarefa existente
- `DELETE /tarefas/:id`: Remove uma tarefa
- `GET /tarefas?status=true/false`: Filtra tarefas por status

## Exemplo de dados
```json
{
  "id": 1,
  "nome": "Comprar pão",
  "status": false
}
