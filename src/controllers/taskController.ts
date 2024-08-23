import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

// Cria uma nova tarefa
const createTask = async (req: Request, res: Response) => {
  console.log('Dados recebidos na requisição POST:', req.body);
  try {
    
    const task = await taskService.createTask(req.body);
    res.status(201).json({ message: 'Task criada com sucesso', resource: task });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível criar a task: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao criar a task' });
    }
  }
};



// Obtém todas as tarefas
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({ message: 'Lista de tasks', resource: tasks });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível obter as tasks: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao listar as tasks' });
    }
  }
};

// Atualiza uma tarefa existente
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const taskData = req.body;
    const task = await taskService.updateTask(id, taskData);
    res.status(200).json({ message: 'Task atualizada com sucesso', resource: task });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível atualizar a task: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao atualizar a task' });
    }
  }
};

// Deleta uma tarefa
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Não foi possível deletar a task: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao deletar a task' });
    }
  }
};
