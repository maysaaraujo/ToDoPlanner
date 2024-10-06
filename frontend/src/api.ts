import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pegue o token do localStorage
  if (token) {
    config.headers.Authorization = token; // Adicione o token no cabeçalho de autorização
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

// Função para atualizar uma tarefa existente
export const updateTask = async (taskId: number, task: any) => {
  try {
    console.log("Tentando atualizar tarefa:", task);
    const response = await api.put(`/tasks/${taskId}`, task);
    console.log("Resposta da atualização da tarefa:", response);
    return response;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

// Função para deletar uma tarefa
export const deleteTask = async (taskId: number, userId: number) => {
  try {
    console.log(`Tentando deletar tarefa com ID: ${taskId}`);
    const response = await api.delete(`/tasks/${taskId}`, { data: { id: taskId, userId } });
    console.log("Resposta da exclusão da tarefa:", response);
    return response;
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
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
