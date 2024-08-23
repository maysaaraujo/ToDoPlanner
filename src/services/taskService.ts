import * as taskRepository from '../repositories/taskRepository';

const createTask = async (taskData: any) => {
  const {titulo, descricao, data, prioridade, userId} = taskData;
  return await taskRepository.createTask(titulo, descricao, data, prioridade, userId);

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
