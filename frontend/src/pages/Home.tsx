import React from 'react';
import { useTheme } from '@mui/material/styles'; 
import { Link } from 'react-router-dom'; 

const Home = () => {
  const theme = useTheme(); 

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    flexDirection: 'column',
    backgroundColor: '#f5f5f5', 
  };

  const textStyle: React.CSSProperties = {
    color: theme.palette.primary.main, 
    textAlign: 'center',
    marginBottom: '20px', 
  };

  const linkStyle: React.CSSProperties = {
    color: theme.palette.primary.main, 
    textDecoration: 'none', 
    fontSize: '18px', 
    margin: '10px 0', 
  };

  return (
    <div style={containerStyle}>
      <h1 style={textStyle}>Bem-vindo ao ToDo Planner</h1>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/create-user" style={linkStyle}>Criar Conta</Link>
    </div>
  );
};

export default Home;
