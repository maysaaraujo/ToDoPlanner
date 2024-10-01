import React, { useState } from 'react';
import { createUser } from '../api'; // Função para enviar a requisição ao backend

function UserForm() {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'user', // Valor padrão como "user"
  });

  const [message, setMessage] = useState('');

  // Função para tratar o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(userData); // Envia os dados ao backend
      setMessage('Usuário criado com sucesso!');
      setUserData({
        nome: '',
        email: '',
        senha: '',
        role: 'user', // Reseta o formulário após o sucesso
      });
    } catch (error) {
      setMessage('Erro ao criar o usuário. Tente novamente.');
    }
  };

  // Função para atualizar os valores do formulário
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
