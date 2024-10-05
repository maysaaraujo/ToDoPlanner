import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask } from '../api'; 
import { AppBar, Toolbar, Typography, Button, TextField, Container, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    titulo: '',
    descricao: '',
    data: '',
    prioridade: 1,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data.resource);
      } catch (error) {
        setError('Erro ao carregar as tarefas');
      }
    };

    getTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    if (newTask.prioridade < 1 || newTask.prioridade > 3) {
      setError('A prioridade deve estar entre 1 e 3');
      return;
    }

    try {
      await createTask(newTask);
      setNewTask({ titulo: '', descricao: '', data: '', prioridade: 1 });
      setError('');
      const response = await fetchTasks();
      setTasks(response.data.resource);
    } catch (error) {
      setError('Erro ao criar a tarefa');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ToDo Planner
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Tarefas
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {tasks.length === 0 && <Typography color="textSecondary">Nenhuma tarefa foi adicionada.</Typography>}

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {tasks.map((task: any) => (
            <Grid item xs={12} key={task.id}>
              <Paper style={{ padding: '15px' }}>
                <Typography variant="h6">{task.titulo}</Typography>
                <Typography variant="body1">{task.descricao}</Typography>
                <Typography variant="body2">Data: {task.data}</Typography>
                <Typography variant="body2">Prioridade: {task.prioridade}</Typography>
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
                inputProps={{ min: 1, max: 3 }} // Limita o valor entre 1 e 3
                required
              />
            </Grid>
            <Grid item xs={12} alignItems="center" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Criar Tarefa
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default TaskPage;
