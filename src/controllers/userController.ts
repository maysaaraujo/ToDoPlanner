import { Request, Response } from 'express';
import * as userService from '../services/userService';

// Cria um novo User
export const createUser = async (req: Request, res: Response) => {
  try {
    
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'user criado com sucesso', resource: user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível criar o user: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao criar o user' });
    }
  }
};



// Obtém todas os users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userService.getAllUsers();
    res.status(200).json({ message: 'Lista de users', resource: user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível obter os users: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao listar as users' });
    }
  }
};

// Atualiza um user existente
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userData = req.body;
    const user = await userService.updateUser(id, userData);
    res.status(200).json({ message: 'user atualizado com sucesso', resource: user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível atualizar o user: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao atualizar o user' });
    }
  }
};

// Deleta um user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível deletar o user: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao deletar o user' });
    }
  }
};
