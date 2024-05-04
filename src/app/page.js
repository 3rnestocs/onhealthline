'use client'
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import LoggedHeader from '@/components/LoggedHeader';
import Home from './home';
import Access from './access/access';
import Register from './access/register/register';
import LoggedLayOut from '@/components/Layouts/LoggedLayOut';
import Specialization from './Schedule/Specialization';
import MySchedule from './Schedule/MySchedule';
import AuthProvider from '@/api/authProvider';
// import PrivateRoute from '@/components/PrivateRoute';
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';
import MyProfile from './Schedule/MyProfile';

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </BrowserRouter>
    // </Provider>
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
    // Reset showLoginButton to true when navigating back to the home page
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