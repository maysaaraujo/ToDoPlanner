// src/services/taskService.ts

import * as taskRepository from '../repositories/taskRepository';
import { Task } from '@prisma/client';

// Cria uma nova tarefa
export const createTask = async (taskData: Omit<Task, 'id'>) => {
  return taskRepository.createTask(taskData);
};

// Obtém todas as tarefas
export const getAllTasks = async () => {
  return taskRepository.getAllTasks();
};

// Atualiza uma tarefa existente
export const updateTask = async (id: number, taskData: Partial<Omit<Task, 'id'>>) => {
  return taskRepository.updateTask(id, taskData);
};

// Deleta uma tarefa
export const deleteTask = async (id: number) => {
  return taskRepository.deleteTask(id);
};
