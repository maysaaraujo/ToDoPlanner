import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcryptjs';


// Função para criar o usuário com hash da senha
export const createUser = async (userData: { nome: string; email: string; senha: string; role: string }) => {
  const { nome, email, senha, role } = userData;

  // Verifica se o e-mail já está cadastrado
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error('O e-mail já está em uso');
  }

  const hashedSenha = await bcrypt.hash(senha, 10); // Hash da senha para armazená-la de forma segura
  return await userRepository.createUser(nome, email, hashedSenha, role); // Envia o usuário para o repositório
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


