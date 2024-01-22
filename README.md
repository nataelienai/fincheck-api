# Fincheck API

Esta é a API que permite o funcionamento do Web App [Fincheck](https://github.com/nataelienai/fincheck-web).

## Tecnologias

- Linguagem: TypeScript (Node.js)
- Gerenciador de pacotes: npm
- Bibliotecas: NestJS, Prisma, bcrypt.js e dotenv
- Banco de dados: PostgreSQL
- Ferramentas: ESLint, Prettier, EditorConfig, commitlint, husky, lint-staged, Git e Docker

## Dependências

Para executar a API em seu computador, você precisará de [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/) e [Docker](https://docs.docker.com/engine/install/) instalados.

## Como executar

1. Usando um terminal, clone o repositório:
```sh
git clone https://github.com/nataelienai/fincheck-api.git
```

2. Entre na pasta do repositório clonado:
```sh
cd fincheck-api
```

3. Inicialize o banco de dados:

- Na primeira vez, execute o comando:
```sh
docker run --name fincheck-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

- Nas outras vezes, basta executar o comando:
```sh
docker start fincheck-db
```

4. Renomeie o arquivo `.env.example` para `.env` e troque o valor da variável `JWT_SECRET`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fincheck?schema=public"
JWT_SECRET=<insira uma chave secreta qualquer aqui>
```

5. Instale as dependências do projeto:
```sh
npm install
```

6. Execute as migrations do Prisma:
```sh
npx prisma migrate dev
```

7. Inicialize a aplicação:
```sh
npm start
```

## Rotas

### Autenticação

- **POST /auth/signup**: Cria uma conta de usuário.
- **POST /auth/signin**: Realiza login numa conta de usuário.

### Usuários

- **GET /users/me**: Lista as informações do usuário logado.

### Categorias

- **GET /categories**: Lista todas as categorias do usuário logado.

### Contas bancárias

- **GET /bank-accounts**: Lista todas as contas bancárias do usuário logado.
- **POST /bank-accounts**: Registra uma conta bancária do usuário logado.
- **PUT /bank-accounts/:bankAccountId**: Atualiza uma conta bancária do usuário logado.
- **DELETE /bank-accounts/:bankAccountId**: Exclui uma conta bancária do usuário logado.

### Transações

- **GET /transactions**: Lista todas as transações do usuário logado.
  - Query filters:
    - year (obrigatório): ano em que ocorreram as transações
    - month (obrigatório): mês em que ocorreram as transações (0-11)
    - bankAccountId: id da conta bancária das transações
    - categoryId: id da categoria das transações
    - type: tipo das transações (EXPENSE ou INCOME)
- **POST /transactions**: Registra uma transação do usuário logado.
- **PUT /transactions/:transactionId**: Atualiza uma transação do usuário logado.
- **DELETE /transactions/:transactionId**: Exclui uma transação do usuário logado.

## Exemplos

Aqui estão exemplos de uso de cada rota da API:

### Autenticação

- **Criar uma conta de usuário**:
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "Natã",
  "email": "nata@email.com",
  "password": "12345678"
}
```

- **Realizar login numa conta de usuário**:
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "nata@email.com",
  "password": "12345678"
}
```

### Usuários

- **Listar as informações do usuário logado**:
```http
GET /users/me
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
```

### Categorias

- **Listar todas as categorias do usuário logado**:
```http
GET /categories
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
```

### Contas bancárias

- **Listar todas as contas bancárias do usuário logado**:
```http
GET /bank-accounts
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
```

- **Registrar uma conta bancária do usuário logado**:
```http
POST /bank-accounts
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
Content-Type: application/json

{
  "name": "Caixa Econômica",
  "initialBalance": 2000,
  "color": "#0000AA",
  "type": "CASH"
}
```

- **Atualizar uma conta bancária do usuário logado**:
```http
PUT /bank-accounts/55570f86-2fd0-41c7-a934-9e3adf9b967e
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
Content-Type: application/json

{
  "name": "Caixa",
  "initialBalance": 2000,
  "color": "#0000AA",
  "type": "CASH"
}
```

- **Excluir uma conta bancária do usuário logado**:
```http
DELETE /bank-accounts/55570f86-2fd0-41c7-a934-9e3adf9b967e
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
```

### Transações

- **Listar todas as transações do usuário logado**:
```http
GET /transactions?year=2024&month=0
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
```

- **Registrar uma transação do usuário logado**:
```http
POST /transactions
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
Content-Type: application/json

{
  "bankAccountId": "28619ec8-1c18-45eb-bb39-3db419e4d57f",
  "categoryId": "7b8a6d44-f9bf-4a4e-8b11-3abf9b980f18",
  "name": "Salário",
  "value": 1000,
  "date": "2024-01-22T19:45:00.000Z",
  "type": "INCOME"
}
```

- **Atualizar uma transação do usuário logado**:
```http
PUT /transactions/f9123ab6-1326-4cc6-8c1d-e44eb616ca0e
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
Content-Type: application/json

{
  "bankAccountId": "28619ec8-1c18-45eb-bb39-3db419e4d57f",
  "categoryId": "7b8a6d44-f9bf-4a4e-8b11-3abf9b980f18",
  "name": "Salário",
  "value": 2000,
  "date": "2024-01-22T19:45:00.000Z",
  "type": "INCOME"
}
```

- **Excluir uma transação do usuário logado**:
```http
DELETE /transactions/f9123ab6-1326-4cc6-8c1d-e44eb616ca0e
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWRjZDUzNC1mOGRlLTRiMDYtYmY4ZC1lMmE4ZmQwNWVlMTAiLCJpYXQiOjE3MDU5NTIxODMsImV4cCI6MTcwNjU1Njk4M30.B_F8qt2s3KKJ6vWe32IUXqxcwRDeOneTrS_NViNHgwE
```
