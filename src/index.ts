import express from 'express';
import * as taskController from './controllers/taskController';
import * as userController from './controllers/userController';
import * as authController from './controllers/authController';
import { authenticateJWT } from './middleware/authMiddleware';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/tasks', authenticateJWT,taskController.createTask);
app.get('/tasks', authenticateJWT,taskController.getAllTasks);
app.put('/tasks/:id', authenticateJWT,taskController.updateTask);
app.delete('/tasks/:id', authenticateJWT,taskController.deleteTask);

app.post('/users', userController.createUser);
app.get('/users', authenticateJWT,userController.getAllUsers);
app.put('/users/:id', authenticateJWT,userController.updateUser);
app.delete('/users/:id', authenticateJWT,userController.deleteUser);

app.post('/login', authController.login);
app.get('/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'Você tem acesso a esta rota protegida', user: req.body.user });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
