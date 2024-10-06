import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask } from '../api'; // Importando a função de atualização de tarefas
import { AppBar, Toolbar, Typography, Button, TextField, Container, Paper, Grid, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

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
      data: newTask.data ? newTask.data + 'T00:00:00.000Z' : '', // Formato ISO completo esperado pelo backend
    };

    // Validação da prioridade
    if (newTask.prioridade! < 1 || newTask.prioridade! > 3) {
      setError('A prioridade deve estar entre 1 e 3');
      return;
    }

    try {
      if (editingTaskId) {
        // Editando uma tarefa existente
        await updateTask(editingTaskId, { ...formattedTask, id: editingTaskId });
        setEditingTaskId(null);
      } else {
        // Criando uma nova tarefa
        await createTask(formattedTask);
      }
      setNewTask({ titulo: '', descricao: '', data: '', prioridade: 1 });
      setError('');
      const response = await fetchTasks();
      setTasks(response.data.resource.filter((task: Task) => task.userId === newTask.userId));
    } catch (error) {
      console.error('Erro ao criar ou editar tarefa:', error);
      setError('Erro ao criar ou editar a tarefa');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: name === 'prioridade' ? parseInt(value) : value, // Corrigido para garantir que prioridade seja um número
    }));
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

  return (
    <div>
      {/* Barra de navegação */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Conteúdo da página de tarefas */}
      <Container style={{ marginTop: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Tarefas
        </Typography>

        {/* Exibe mensagem de erro ou nenhuma tarefa */}
        {error && <Typography color="error">{error}</Typography>}
        {tasks.length === 0 && <Typography color="textSecondary">Nenhuma tarefa foi adicionada.</Typography>}

        {/* Lista de tarefas */}
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {tasks.map((task: Task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Paper
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  maxHeight: '300px', // Limitação da altura do card
                  overflow: 'hidden', // Evita que o texto "vaze"
                  wordWrap: 'break-word', // Quebra o texto em palavras para evitar vazamentos
                }}
              >
                <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {task.titulo}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '10px', wordWrap: 'break-word' }}>
                  {task.descricao}
                </Typography>
                <Typography variant="body2">Data: {formatDate(task.data)}</Typography>

                {/* Tag de prioridade */}
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

                <Button
                  onClick={() => handleEditTask(task)}
                  variant="outlined"
                  style={{ marginTop: '15px', display: 'block' }}
                >
                  Editar
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Formulário de criação/edição de tarefas */}
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
                inputProps={{ min: 1, max: 3 }} // Limita o valor entre 1 e 3
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
