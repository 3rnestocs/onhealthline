'use client'
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from './home';
import Access from './access/access';
import LoggedLayOut from '@/components/Layouts/LoggedLayOut';
import Specialization from './Schedule/Specialization';
import MySchedule from './Schedule/MySchedule';

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
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/access" element={<Access />} />
        <Route path="/" element={<Home
        onMenuClick={handleMenuClick}
        onLoginClick={handleLoginClick}
        showLoginButton={showLoginButton}        
        />} />
        <Route path="/schedules" element={<LoggedLayOut> <Specialization /></LoggedLayOut>} />
        <Route path="/myschedules" element={<LoggedLayOut> <MySchedule/></LoggedLayOut>} />
      </Routes>
    </>
  );
}

export default App;