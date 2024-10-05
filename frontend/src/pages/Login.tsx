import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Box } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/tasks'); // Redireciona para a página de tarefas
      }
    } catch (error) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
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
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <Typography variant="h4">Login</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="senha"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            value={credentials.senha}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
