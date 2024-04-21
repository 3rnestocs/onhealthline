'use client'
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from './home';
import Access from './access/access';
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
    navigate('/access');
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
        <Route path="/access" element={<Access />} />
      </Routes>
    </>
  );
}

export default App;