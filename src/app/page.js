'use client'
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import OAppBar from '@/components/OAppBar';
import Home from './home';
import Access from './access/access';
import Register from './access/register/register';
import LoggedLayOut from '@/components/Layouts/LoggedLayOut';
import Specialization from './Schedule/Specialization';
import MySchedule from './Schedule/MySchedule';
import MyProfile from './Schedule/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const handleMenuClick = () => {
    navigate('/');
    setShowLoginButton(true);
  };

  const handleLoginClick = () => {
    navigate('/access');
    setShowLoginButton(false);
  };

  const [showLoginButton, setShowLoginButton] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAppBar, setShowAppBar] = React.useState(true);
  
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  React.useEffect(() => {
    // Reset showLoginButton to true when navigating back to the home page
    if (location.pathname === '/') {
      setShowLoginButton(true);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    setShowAppBar(!['/schedules', '/myschedules','/myProfile'].includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      {showAppBar && (
        <OAppBar
          onMenuClick={handleMenuClick}
          onLoginClick={handleLoginClick}
          showLoginButton={showLoginButton}
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