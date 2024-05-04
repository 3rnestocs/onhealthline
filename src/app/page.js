'use client'
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import LoggedHeader from '@/components/LoggedHeader';
import Home from './home/Home';
import Access from './access/access';
import Register from './access/register/Register';
import LoggedLayOut from '@/components/Layouts/LoggedLayOut';
import Specialization from './specialists/Specialization';
import MySchedule from './schedule/MySchedule';
import AuthProvider from '@/api/authProvider';
import MyProfile from './profile/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </BrowserRouter>
  );
}

function Content() {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAppBar, setShowAppBar] = useState(true);
  const handleMenuClick = () => {
    navigate('/');
    setShowLoginButton(true);
  };

  const handleLoginClick = () => {
    navigate('/access');
    setShowLoginButton(false);
  };


  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setShowLoginButton(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    setShowAppBar(!['/schedules', '/myschedules','/myProfile'].includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      {showAppBar && (
        <LoggedHeader
          onMenuClick={handleMenuClick}
          onLoginClick={handleLoginClick}
          type={showLoginButton ? 'home' : 'access'}
        />
      )}
      <Routes>
        <Route path="/access" element={<Access />} />
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<LoggedLayOut> <Specialization /></LoggedLayOut>} />
        <Route path="/myschedules" element={<LoggedLayOut> <MySchedule/></LoggedLayOut>} />
        <Route path="/register" element={<Register />} />
        <Route path="/myProfile" element={<LoggedLayOut> <MyProfile/></LoggedLayOut>} />
      </Routes>
    </>
  );
}

export default App;