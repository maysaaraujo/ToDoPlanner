import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetchTasks();
      setTasks(response.data.resource);
    };

    loadTasks();
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            {task.titulo} - {task.descricao} - {new Date(task.data).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
