import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, styled, Tabs, Tab } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import SickIcon from '@mui/icons-material/Sick';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PacienteLogin from './login/pacienteLogin';
import Register from './register/register';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © OnHealthLine '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  minWidth: '30%',
  minHeight: '60%',
});

export default function Access() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
      <MainBox sx={{height:'70vh'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} width={"100%"}>
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
                fontSize: '1.2rem',
                fontWeight: 'bold',
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
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: (theme) => (value === 1 ? '#10587e' : 'gray'), // Customize color based on tab selection
                '& .MuiSvgIcon-root': {
                  color: (theme) => ('#10587e'), // Customize icon color based on tab selection
                },
              }}
            />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          margin={'auto'}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <PacienteLogin />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Register />
          </TabPanel>
        </SwipeableViews>
        <Copyright/>
      </MainBox>
    </Box>
  );
}