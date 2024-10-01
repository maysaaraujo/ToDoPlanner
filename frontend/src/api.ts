import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

export const fetchTasks = () => api.get('/tasks');
export const createTask = (taskData: any) => api.post('/tasks', taskData);

// Função de login
export const login = (credentials: { email: string; senha: string }) => {
  return api.post('/login', credentials);
};

// Função para criar um novo usuário
export const createUser = (userData: { nome: string; email: string; senha: string; role: string }) => {
  return api.post('/users', userData);
};