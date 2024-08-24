import express from 'express';
import * as taskController from './controllers/taskController';
import * as userController from './controllers/userController';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/tasks', (req, res, next) => {
  console.log('Recebido POST em /tasks', req.body);
  next(); // Chama o próximo middleware, que é o taskController.createTask
}, taskController.createTask);

app.get('/tasks', taskController.getAllTasks);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.post('/users', (req, res, next) => {
  console.log('Recebido POST em /users', req.body);
  next(); // Chama o próximo middleware, que é o userController.createUser
}, userController.createUser);

app.get('/users', userController.getAllUsers);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
