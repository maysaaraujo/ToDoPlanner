import { PrismaClient, Task} from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (titulo: string, descricao:string, data:Date, prioridade:number, userId:number) => {
  return await prisma.task.create({
    data: {titulo, descricao, data, prioridade, userId}
  });
};

export const getAllTasks = async () => {
  return await prisma.task.findMany();
};

export const updateTask = async (id: number, data: Partial<Task>) => {
  return await prisma.task.update({
    where: { id },
    data
  });
}; 

export const deleteTask = async (id: number) => {
  return await prisma.task.delete({
    where: { id }
  });
};
