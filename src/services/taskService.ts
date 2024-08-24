import * as taskRepository from '../repositories/taskRepository';
import { Task } from '@prisma/client';

export const createTask = async (taskData: any) => {
  const {titulo, descricao, data, prioridade, userId} = taskData;
  return await taskRepository.createTask(titulo, descricao, data, prioridade, userId);

};

export const getAllTasks = async () => {
  return await taskRepository.getAllTasks();
};

export const updateTask = async (id: number, task:Partial<Task> ) => {
  return await taskRepository.updateTask(id, task);
}; 

export const deleteTask = async (id: number) => {
  return await taskRepository.deleteTask(id);
};
