import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rotas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token'); // Recupera o token do localStorage

  if (!token) {
    // Se não houver token, redireciona para o login
    return <Navigate to="/login" />;
  }

  // Se houver token, exibe o componente protegido
  return children;
}

export default ProtectedRoute;
