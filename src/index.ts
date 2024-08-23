// src/index.ts

import express from 'express';
import * as taskController from './controllers/taskController';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getAllTasks);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
