import express from 'express';
import * as taskController from './controllers/taskController';
import * as userController from './controllers/userController';
import * as authController from './controllers/authController';
import { authenticateJWT } from './middleware/authMiddleware';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getAllTasks);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.post('/login', authController.login);
app.get('/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'Você tem acesso a esta rota protegida', user: req.user });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
