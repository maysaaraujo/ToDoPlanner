import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (nome: string, email:string, senha:string, role:string,) => {
  return await prisma.user.create({
    data: {nome, email, senha, role}
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const updateUser = async (id: number, taskData: any) => {
  return await prisma.user.update({
    where: { id },
    data: taskData
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  });
};
