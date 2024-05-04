import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import LoggedHeader from '../src/components/LoggedHeader';
import Home from '../src/app/home/Home';
import Register from '../src/app/access/register/register';
import LoggedLayOut from '../src/components/Layouts/LoggedLayOut'
import Specialization from '../src/app/specialists/Specialization';
import MySchedule from '../src/app/Schedule/MySchedule';
import AuthProvider from '../src/api/authProvider';
import MyProfile from '../src/app/profile/MyProfile'
import Access from '../src/app/access/Access';
import Schedule from '../src/app/Schedule/Schedule'
import SelectSchedule from './app/Schedule/SelectSchedule';

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
    setShowAppBar(!['/schedules', '/myschedules','/myProfile', '/select-schedule'].includes(location.pathname));
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
        <Route path="/schedules" element={<LoggedLayOut> <Specialization/></LoggedLayOut>} />
        <Route path="/myschedules" element={<LoggedLayOut> <MySchedule/></LoggedLayOut>} />
        <Route path="/register" element={<Register />} />
        <Route path="/myProfile" element={<LoggedLayOut> <MyProfile/></LoggedLayOut>} />
        <Route path="/select-schedule" element={<LoggedLayOut> <SelectSchedule/></LoggedLayOut>} />
      </Routes>
    </>
  );
}

export default App;