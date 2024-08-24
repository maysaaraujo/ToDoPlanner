# ToDoPlanner

**ToDoPlanner** é uma aplicação para gerenciamento de tarefas desenvolvida com Node.js e Prisma. O objetivo do projeto é fornecer uma API para criar, listar, atualizar e deletar tarefas e usuários, utilizando uma arquitetura em camadas para garantir a organização e escalabilidade do código.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)


## Tecnologias Utilizadas

- **Node.js** - Plataforma para execução do JavaScript no servidor.
- **Express** - Framework para criação de APIs.
- **Prisma** - ORM para manipulação do banco de dados.
- **PostgreSQL** - Sistema de gerenciamento de banco de dados relacional.
- **Swagger** - Ferramenta para documentação da API.

## Arquitetura do Projeto

O projeto é estruturado em uma arquitetura em camadas, com as seguintes camadas:

- **Modelos (Models)**: Definem as entidades `User` e `Task` no banco de dados.
- **Repositórios (Repositories)**: Encapsulam a lógica de acesso ao banco de dados.
- **Serviços (Services)**: Contêm a lógica de negócios e interagem com os repositórios.
- **Controladores (Controllers)**: Gerenciam as requisições HTTP e utilizam os serviços para processar os dados.
