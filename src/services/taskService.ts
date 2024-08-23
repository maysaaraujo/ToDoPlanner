import * as taskRepository from '../repositories/taskRepository';

export const createTask = async (taskData: any) => {
  return await taskRepository.createTask(taskData);
};

export const getAllTasks = async () => {
  return await taskRepository.getAllTasks();
};

export const updateTask = async (id: number, taskData: any) => {
  return await taskRepository.updateTask(id, taskData);
};

export const deleteTask = async (id: number) => {
  return await taskRepository.deleteTask(id);
};
