// src/repositories/taskRepository.ts

import prisma from '../prisma/prismaClient';
import { Task, User } from '@prisma/client';

// Função para criar uma tarefa
export const createTask = async (taskData: Omit<Task, 'id'>) => {
  return prisma.task.create({
    data: taskData,
  });
};

// Função para buscar todas as tarefas
export const getAllTasks = async () => {
  return prisma.task.findMany();
};

// Função para atualizar uma tarefa
export const updateTask = async (id: number, taskData: Partial<Omit<Task, 'id'>>) => {
  return prisma.task.update({
    where: { id },
    data: taskData,
  });
};

// Função para deletar uma tarefa
export const deleteTask = async (id: number) => {
  return prisma.task.delete({
    where: { id },
  });
};
