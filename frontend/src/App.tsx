import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './pages/Login';
import UserForm from './components/UserForm'; // Importe o formulário de criação de usuário
import ProtectedRoute from './components/ProtectedRoute'; // Para proteger as rotas

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/tasks">Lista de Tarefas</Link></li>
            <li><Link to="/create-task">Criar Tarefa</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/create-user">Criar Usuário</Link></li> {/* Link para o formulário de cadastro */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<UserForm />} /> {/* Rota para o formulário de cadastro */}

          {/* Rotas protegidas */}
          <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
          <Route path="/create-task" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
