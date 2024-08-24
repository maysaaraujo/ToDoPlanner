import * as userRepository from '../repositories/userRepository';

export const createUser = async (userData: any) => {
  const {nome, email, senha, role} = userData;
  return await userRepository.createUser(nome, email, senha, role);

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
