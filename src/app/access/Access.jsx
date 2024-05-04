import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, styled, Tabs, Tab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SickIcon from '@mui/icons-material/Sick';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Login from './login/login';
import Register from './register/register';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: '16px' }} {...props}>
      {'Copyright © OnHealthLine '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledTypography = styled(Typography)({
  color: '#2373a0',
  padding: '5px',
  marginBottom: '10px',
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const MainBox = styled(Box)({
  border: '2px solid black',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'white',
  margin: 'auto',
  minWidth: '35%',
  minHeight: '60%',
  overflowY: 'auto'
});

export default function Access() {
  const [value, setValue] = React.useState(0);
  const [isShowingLogin, setIsShowingLogin] = React.useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRegisterAction = () => {
    setIsShowingLogin(false);
    setValue(value);
  };
  const handleLoginAction = () => {
    setIsShowingLogin(true);
    setValue(value);
  };

  const theme = useTheme();

  const appbarHeight = 64;
  const containerHeight = window.innerHeight - appbarHeight;

  return (
    <Box
      backgroundColor={'#e6f9f6'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      width={'100%'}
      height={`${containerHeight}px`}
      overflow={'hidden'}
    >
      <MainBox sx={{ height: '70vh' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} width={"100%"}>
          {!isShowingLogin && (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                iconPosition="start"
                icon={<SickIcon />}
                label={<Typography variant="h5">Soy paciente</Typography>} // Customize the label with Typography
                {...a11yProps(0)}
                sx={{
                  color: (theme) => (value === 0 ? '#10587e' : 'gray'), // Customize color based on tab selection
                  '& .MuiSvgIcon-root': {
                    color: (theme) => ('#10587e'), // Customize icon color based on tab selection
                  },
                }}
              />
              <Tab
                iconPosition="start"
                icon={<LocalHospitalIcon />}
                label={<Typography variant="h5">Soy doctor</Typography>} // Customize the label with Typography
                {...a11yProps(1)}
                sx={{
                  color: (theme) => (value === 1 ? '#10587e' : 'gray'), // Customize color based on tab selection
                  '& .MuiSvgIcon-root': {
                    color: (theme) => ('#10587e'), // Customize icon color based on tab selection
                  },
                }}
              />
            </Tabs>
          )}
          {isShowingLogin && (
            <StyledTypography variant="h5">Bienvenido a OnHealthLine</StyledTypography>
          )}
        </Box>
        {value === 0 && !isShowingLogin && (
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Register tipoUsuario={"paciente"} />
          </TabPanel>
        )}
        {value === 1 && !isShowingLogin && (
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Register tipoUsuario={"medico"} />
          </TabPanel>
        )}
        {isShowingLogin && (
          <Login />
        )}

        <Box display="flex" justifyContent="center" sx={{marginTop: '16px' }}>
          {isShowingLogin ? (
            <Typography variant="body2">
              ¿No tienes una cuenta? <button onClick={() => handleRegisterAction()} style={{ color: '#2376a1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Regístrate aquí</button>
            </Typography>
          ) : (
            <Typography variant="body2">
              ¿Ya tienes una cuenta? <button onClick={() => handleLoginAction()} style={{ color: '#2376a1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Inicia sesión aquí</button>
            </Typography>
          )}
        </Box>
        <Copyright />
      </MainBox>
    </Box>
  );
}