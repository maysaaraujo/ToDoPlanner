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

