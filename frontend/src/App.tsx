import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TaskPage from './pages/TaskPage';
import UserForm from './pages/UserForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/create-user" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
