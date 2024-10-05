import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask } from '../api';
import { AppBar, Toolbar, Typography, Button, TextField, Container, Paper, Grid, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    titulo: '',
    descricao: '',
    data: '',
    prioridade: 1,
    userId: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setNewTask((prev) => ({ ...prev, userId }));
    }

    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        // Filtra tarefas apenas do usuário logado
        const userTasks = response.data.resource.filter((task: any) => task.userId === userId);
        setTasks(userTasks);
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

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedTask = {
      ...newTask,
      data: newTask.data ? newTask.data + 'T00:00:00Z' : '', // Formato ISO esperado pelo backend
    };

    if (newTask.prioridade < 1 || newTask.prioridade > 3) {
      setError('A prioridade deve estar entre 1 e 3');
      return;
    }

    try {
      await createTask(formattedTask);
      setNewTask((prev) => ({ ...prev, titulo: '', descricao: '', data: '', prioridade: 1 }));
      setError('');
      const response = await fetchTasks();
      const userId = getUserIdFromToken();
      const userTasks = response.data.resource.filter((task: any) => task.userId === userId);
      setTasks(userTasks);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      setError('Erro ao criar a tarefa');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const getPriorityColor = (prioridade: number) => {
    switch (prioridade) {
      case 1:
        return 'error'; // Vermelha
      case 2:
        return 'warning'; // Amarela
      case 3:
      default:
        return 'success'; // Verde
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Tarefas
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {tasks.length === 0 && <Typography color="textSecondary" align="center">Nenhuma tarefa foi adicionada.</Typography>}

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {tasks.map((task: any) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Paper elevation={3} style={{ padding: '20px', position: 'relative' }}>
                <Typography variant="h6" gutterBottom>{task.titulo}</Typography>
                <Typography variant="body1" gutterBottom>{task.descricao}</Typography>
                <Typography variant="body2" gutterBottom>Data: {dayjs(task.data).format('YYYY-MM-DD')}</Typography>
                <Chip
                  label={`Prioridade ${task.prioridade}`}
                  color={getPriorityColor(task.prioridade)}
                  style={{ position: 'absolute', top: '10px', right: '10px' }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" style={{ marginTop: '40px' }} align="center">
          Criar Nova Tarefa
        </Typography>

        <form onSubmit={handleCreateTask} style={{ marginTop: '20px' }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={newTask.titulo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descrição"
                name="descricao"
                value={newTask.descricao}
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
                value={newTask.data}
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
                value={newTask.prioridade}
                onChange={handleChange}
                inputProps={{ min: 1, max: 3 }}
                required
              />
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Criar Tarefa
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
