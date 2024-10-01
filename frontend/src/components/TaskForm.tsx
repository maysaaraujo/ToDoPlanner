import React, { useState } from 'react';
import { createTask } from '../api';

function TaskForm() {
  const [taskData, setTaskData] = useState({
    titulo: '',
    descricao: '',
    data: '',
    prioridade: 0,
    userId: 1 // Ajuste conforme a lógica de autenticação
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(taskData);
    alert('Tarefa criada com sucesso!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Nova Tarefa</h2>
      <input
        name="titulo"
        placeholder="Título"
        value={taskData.titulo}
        onChange={handleChange}
      />
      <input
        name="descricao"
        placeholder="Descrição"
        value={taskData.descricao}
        onChange={handleChange}
      />
      <input
        name="data"
        type="date"
        value={taskData.data}
        onChange={handleChange}
      />
      <input
        name="prioridade"
        type="number"
        value={taskData.prioridade}
        onChange={handleChange}
      />
      <button type="submit">Criar</button>
    </form>
  );
}

export default TaskForm;
