# ToDoPlanner

**ToDoPlanner** é uma aplicação de gerenciamento de tarefas desenvolvida com **Node.js** e **Prisma**. O objetivo do projeto é fornecer uma API RESTful que permite aos usuários criar, listar, atualizar e deletar tarefas, além de gerenciar usuários. A aplicação segue uma arquitetura em camadas, o que garante a organização e escalabilidade do código, e utiliza o **PostgreSQL** como banco de dados relacional.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação e Execução](#instalação-e-execução)

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **Express**: Framework minimalista e flexível para a criação de APIs RESTful.
- **Prisma**: ORM (Object-Relational Mapper) que facilita a interação com o banco de dados PostgreSQL, permitindo uma gestão eficiente e tipada dos dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados de usuários e tarefas.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização dos usuários.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, garantindo maior robustez no código.
- **Swagger**: Ferramenta para gerar documentação interativa da API.
- **MUI (Material-UI)**: Biblioteca de componentes React para a criação de interfaces de usuário no frontend.
- **React.js**: Biblioteca JavaScript para a construção de interfaces de usuário, usada na camada frontend do projeto.
- **Docker**: Plataforma para automação de aplicativos em contêineres, garantindo que a aplicação rode de forma consistente em qualquer ambiente.

## Arquitetura do Projeto

O projeto é estruturado em uma **arquitetura em camadas**, dividida em várias responsabilidades. Isso garante maior escalabilidade, facilidade de manutenção e organização. Abaixo estão as camadas principais:

- **Modelos (Models)**: Definem as entidades `User` e `Task` no banco de dados através do Prisma ORM.
- **Repositórios (Repositories)**: Encapsulam a lógica de interação com o banco de dados, permitindo que a aplicação faça CRUD (Create, Read, Update, Delete) nas entidades.
- **Serviços (Services)**: Contêm a lógica de negócios da aplicação, processando dados e aplicando regras específicas antes de enviar ou receber dados dos repositórios.
- **Controladores (Controllers)**: Gerenciam as requisições HTTP, chamando os serviços para manipular os dados e retornando respostas apropriadas.
- **Autenticação**: Utiliza JWT para proteger rotas e garantir que apenas usuários autenticados possam acessar certos recursos.

## Funcionalidades

O ToDoPlanner oferece as seguintes funcionalidades:

- **Usuários**:
  - Criar um novo usuário.
  - Autenticar um usuário através de login.
  - Gerenciar perfis de usuários.
- **Tarefas**:
  - Criar novas tarefas associadas a um usuário.
  - Listar todas as tarefas de um usuário específico.
  - Atualizar e editar tarefas.
  - Deletar tarefas.

## Instalação e Execução

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ToDoPlanner.git
```

Entre no diretório do projeto:
```bash
cd ToDoPlanner
```

Instale as dependências:
```bash
npm install
```
**Configure o banco de dados:**

Crie um banco de dados PostgreSQL chamado todoplanner (ou outro nome à sua escolha).
No arquivo .env na raiz do projeto, adicione a URL de conexão com seu banco de dados PostgreSQL:
```bash
DATABASE_URL="postgresql://seu-usuario:senha@localhost:5432/todoplanner"
JWT_SECRET="seu-segredo-jwt"
```
Crie o arquivo docker-compose.yml com a seguinte configuração:
```bash
version: '3'
services:
  database:
    image: postgres:13
    environment:
      POSTGRES_USER: seu-usuario
      POSTGRES_PASSWORD: senha
      POSTGRES_DB: todoplanner
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: npm run dev
    environment:
      DATABASE_URL: postgresql://seu-usuario:senha@database:5432/todoplanner
      JWT_SECRET: seu-segredo-jwt
    ports:
      - "3000:3000"
    depends_on:
      - database

  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```
Inicie os contêineres com o Docker Compose:
```bash
docker-compose up --build
```
Rode as migrações do Prisma para criar as tabelas no banco de dados
```bash
docker-compose exec backend npx prisma migrate dev
```
Inicie o servidor
```bash
npm run dev
```
Agora, o servidor estará rodando em http://localhost:3000.

**Para rodar o Frontend**

Entre no diretório do frontend:
```bash
cd frontend
```
Instale as dependências:
```bash
npm install
```
Inicie o frontend
```bash
npm start
```
O frontend estará disponível em http://localhost:3001 
