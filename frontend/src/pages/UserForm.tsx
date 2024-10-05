import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Box, Paper } from '@mui/material';
import { createUser } from '../api'; 

const UserForm = () => {
  const [user, setUser] = useState({ nome: '', email: '', senha: '', role: 'user' }); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(user); 
      if (response.status === 201) {
        navigate('/login'); // Redireciona para a página de login após criar o usuário
      }
    } catch (error) {
      setError('Erro ao criar usuário. Tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
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

      <Container maxWidth="xs" style={{ marginTop: '50px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Box mt={2}>
            <Typography variant="h5" align="center" gutterBottom>
              Criar Conta
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nome"
                name="nome"
                fullWidth
                value={user.nome}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={user.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                label="Senha"
                name="senha"
                type="password"
                fullWidth
                value={user.senha}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Criar Conta
                </Button>
              </Box>
              <Box mt={2} textAlign="center">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Já tem uma conta? Faça login
                  </Typography>
                </Link>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default UserForm;
