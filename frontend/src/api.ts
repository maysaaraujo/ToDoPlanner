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
export const createUser = async (userData: { nome: string; email: string; senha: string; role: string }) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error; // Lança um erro para ser capturado no frontend
  }
};