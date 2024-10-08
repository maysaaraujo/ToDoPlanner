import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api'; 
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Container, Paper, Grid, Chip, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 


// Definindo uma interface para a tarefa
interface Task {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  prioridade: number;
  userId: number;
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    titulo: '',
    descricao: '',
    data: '',
    prioridade: 1,
  });
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setNewTask((prev) => ({ ...prev, userId }));
    }

    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data.resource.filter((task: Task) => task.userId === userId));
      } catch (error) {
        setError('Erro ao carregar as tarefas');
      }
    };

    getTasks();
  }, []);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.uid;
    } catch (e) {
      console.error('Erro ao decodificar o token:', e);
      return null;
    }
  };

  // Função para criar ou editar uma tarefa
  const handleCreateOrEditTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedTask = {
      ...newTask,
      data: newTask.data ? newTask.data + 'T00:00:00.000Z' : '',
    };

    if (newTask.prioridade! < 1 || newTask.prioridade! > 3) {
      setError('A prioridade deve estar entre 1 e 3');
      return;
    }

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, { ...formattedTask, id: editingTaskId });
        setTasks((prevTasks) => prevTasks.map((task) => task.id === editingTaskId ? { ...task, ...formattedTask } : task)); // Atualiza a lista localmente
        setEditingTaskId(null);
      } else {
        const response = await createTask(formattedTask);
        setTasks((prevTasks) => [...prevTasks, response.data.resource]); // Adiciona a nova tarefa à lista existente
      }
      setNewTask({ titulo: '', descricao: '', data: '', prioridade: 1, userId: newTask.userId });
      setError('');
    } catch (error) {
      console.error('Erro ao criar ou editar tarefa:', error);
      setError('Erro ao criar ou editar a tarefa');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: name === 'prioridade' ? parseInt(value) : value,
    }));
  };

  // Função para deletar uma tarefa
  const handleDeleteTask = async (taskId: number) => {
    const userId = getUserIdFromToken(); // Pegue o userId do token
    if (!userId) {
      setError('Erro: usuário não autenticado.');
      return;
    }

    try {
      await deleteTask(taskId, userId); // Passa o taskId e o userId
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Remove a tarefa excluída da lista
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      setError('Erro ao deletar a tarefa');
    }
  };

  const handleEditTask = (task: Task) => {
    setNewTask({
      titulo: task.titulo,
      descricao: task.descricao,
      data: task.data.split('T')[0],
      prioridade: task.prioridade,
      userId: task.userId,
    });
    setEditingTaskId(task.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); 
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* Botão de Logout no canto direito */}
          <IconButton color="inherit" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Logout
          </IconButton>

        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Tarefas
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {tasks.length === 0 && <Typography color="textSecondary">Nenhuma tarefa foi adicionada.</Typography>}

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {currentTasks.map((task: Task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Paper
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  maxHeight: '300px',
                  overflow: 'hidden',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {task.titulo}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '10px', wordWrap: 'break-word' }}>
                  {task.descricao}
                </Typography>
                <Typography variant="body2">Data: {formatDate(task.data)}</Typography>

                <Chip
                  label={`Prioridade ${task.prioridade}`}
                  style={{
                    backgroundColor:
                      task.prioridade === 1 ? '#f44336' :
                        task.prioridade === 2 ? '#ff9800' : '#4caf50',
                    color: 'white',
                    marginTop: '10px',
                  }}
                />

                <Grid container spacing={2} >
                  <Grid item>
                    <Button
                      onClick={() => handleEditTask(task)}
                      variant="outlined"
                      style={{ marginTop: '10px' }}
                    >
                      Editar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      variant="outlined"
                      color="secondary"
                      style={{ marginTop: '10px' }}
                    >
                      Deletar
                    </Button>
                  </Grid>
                </Grid>

              </Paper>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(tasks.length / tasksPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />

        <Typography variant="h5" style={{ marginTop: '40px' }} align="center">
          {editingTaskId ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
        </Typography>

        <form onSubmit={handleCreateOrEditTask} style={{ marginTop: '20px' }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={newTask.titulo || ''}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descrição"
                name="descricao"
                value={newTask.descricao || ''}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data"
                name="data"
                value={newTask.data || ''}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prioridade (1 a 3)"
                name="prioridade"
                type="number"
                value={newTask.prioridade || 1}
                onChange={handleChange}
                inputProps={{ min: 1, max: 3 }}
                required
              />
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {editingTaskId ? 'Salvar Alterações' : 'Criar Tarefa'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default TaskPage;
