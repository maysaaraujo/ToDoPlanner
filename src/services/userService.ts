import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcryptjs';


// Atualização na criação de usuário para hash da senha
export const createUser = async (userData: any) => {
  const { nome, email, senha, role } = userData;
  const hashedSenha = await bcrypt.hash(senha, 10);
  return await userRepository.createUser(nome, email, hashedSenha, role);
};

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const updateUser = async (id: number, taskData: any) => {
  return await userRepository.updateUser(id, taskData);
};

export const deleteUser = async (id: number) => {
  return await userRepository.deleteUser(id);
};
export const getUserByEmail = async (email: string) => {
  return await userRepository.getUserByEmail(email);
};


