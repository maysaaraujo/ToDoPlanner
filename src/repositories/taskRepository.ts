import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (taskData: any) => {
  return await prisma.task.create({
    data: taskData
  });
};

export const getAllTasks = async () => {
  return await prisma.task.findMany();
};

export const updateTask = async (id: number, taskData: any) => {
  return await prisma.task.update({
    where: { id },
    data: taskData
  });
};

export const deleteTask = async (id: number) => {
  return await prisma.task.delete({
    where: { id }
  });
};
