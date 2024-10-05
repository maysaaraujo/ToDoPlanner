import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pegue o token do localStorage
  if (token) {
    config.headers.Authorization =  token; // Adicione o token no cabeçalho de autorização
  }
  return config;
});

export const fetchTasks = () => api.get('/tasks');

// Função para criar uma tarefa
export const createTask = async (task: any) => {
  try {
    console.log("Tentando criar tarefa:", task);
    const response = await api.post('/tasks', task);
    console.log("Resposta da criação da tarefa:", response);
    return response;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

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