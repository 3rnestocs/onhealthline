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
import AuthProvider from '@/api/AuthProvider';
// import PrivateRoute from '@/components/PrivateRoute';
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';


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
    setShowAppBar(!['/schedules', '/myschedules'].includes(location.pathname));
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
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/schedules" element={<LoggedLayOut> <Specialization /></LoggedLayOut>} />
        {/* </Route> */}
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/myschedules" element={<LoggedLayOut> <MySchedule /></LoggedLayOut>} />
        {/* </Route> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;