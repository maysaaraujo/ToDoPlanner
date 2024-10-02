import React, { useState } from 'react';
import { createUser } from '../api'; // Importar a função de criação de usuário da API

function UserForm() {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'user', // Valor padrão como "user"
  });
  
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Chama a função de criação de usuário
      await createUser(userData);
      setMessage('Usuário criado com sucesso!');
      // Limpa o formulário
      setUserData({
        nome: '',
        email: '',
        senha: '',
        role: 'user',
      });
    } catch (error) {
      setMessage('Erro ao criar o usuário. Tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Criar Novo Usuário</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={userData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={userData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
}

export default UserForm;
