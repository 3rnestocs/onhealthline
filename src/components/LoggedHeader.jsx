import React from 'react';
import Image from 'next/image';
import { AppBar, Typography, Box, IconButton, Button } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'
import { getUserName } from '@/utils/localStorageHelper';
import HomeIcon from '@mui/icons-material/Home';
import OButton from './OButton';

const StyledAppBar = styled(AppBar)({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#EFEFEF',
  boxShadow: 'none'
})

const StyledBox = styled(Box)({
  '&.logo': {
    border: 'solid 5px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
    marginRight: '5px'
  },
  '&.options': {
    border: 'solid 5px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'row'
  }
});

const StyledTypography = styled(Typography)({
  color: '#2373a0',
  padding: '5px'

})
const StyledIconButton = styled(IconButton)({
  color: '#2373a0',
  padding: '5px',
  marginRight: '10px',
  '& svg': {
    fontSize: '3rem',
  },
});

const LoggedHeader = ({ onMenuClick, onLoginClick, type }) => {
  return (
    <StyledAppBar position='sticky'>
      <StyledBox className='logo'>
        <Link to='/home'>
          <Image
            alt='logo'
            src={'/assets/logo_test.svg'}
            width={350}
            height={60} />
        </Link>

      </StyledBox>

      <StyledBox className='options'>
        {type == "access" && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ marginLeft: '10px', marginRight: '0px' }}
          >
            <HomeIcon sx={{ fontSize: 40, color: "#10587e" }} />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexGrow: 0.80 }}>
          <StyledTypography variant='h5' sx={{ fontWeight: 'bold', padding: '6px 20px' }}>Telemedicina de confianza</StyledTypography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 0.15 }}>
          {/* <StyledIconButton>
              <Link to='/'> <NotificationsIcon sx={{ color: '#2373a0' }} /> </Link>
            </StyledIconButton> */}
          {type == "home" && (
            <OButton onClick={onLoginClick} title={'Iniciar sesion'} />
          )}

          {type == "logged" && (
            <>
              <StyledIconButton>
                <Link to='/myProfile'> <AccountCircleIcon sx={{ color: '#2373a0' }} /> </Link>
              </StyledIconButton>
              <Link to='/myProfile' style={{ textDecoration: 'none' }}> <StyledTypography variant='h6' >{getUserName()}</StyledTypography> </Link>
            </>
          )}
        </Box>
      </StyledBox>
    </StyledAppBar>
  );
};


export default LoggedHeader;