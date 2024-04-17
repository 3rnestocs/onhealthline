'use client'
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from './home';
import Login from './login/login';
import Register from "./register/register";
import OAppBar from '@/components/OAppBar';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const [showLoginButton, setShowLoginButton] = React.useState(true);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
    setShowLoginButton(true);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setShowLoginButton(false);
  };

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <>
      <OAppBar 
        onMenuClick={handleMenuClick} 
        onLoginClick={handleLoginClick} 
        showLoginButton={showLoginButton} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;