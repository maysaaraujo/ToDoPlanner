import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário após login
import { login } from '../api'; // Função para fazer a requisição ao backend

function Login() {
  const [credentials, setCredentials] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      const token = response.data.token;

      if (token) {
        // Salva o token no localStorage ou sessionStorage
        localStorage.setItem('token', token);

        // Redireciona o usuário após o login
        navigate('/tasks');
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
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            name="senha"
            type="password"
            value={credentials.senha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
