import React from 'react';
import Image from 'next/image';
import { AppBar, Typography, Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'
import { getUserName } from '@/utils/localStorageHelper';

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

const LoggedHeader = () => {
  return (
    <StyledAppBar position='sticky'>
      <StyledBox className='logo'>
        <Link to='/'>
          <Image src={'/assets/Logo.png'} width={350} height={60} />
        </Link>

      </StyledBox>

      <StyledBox className='options'>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexGrow: 0.80 }}>
          <StyledTypography variant='h5' sx={{ fontWeight: 'bold', padding: '6px 20px' }}>Citas Online</StyledTypography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <StyledIconButton>
            <Link to='/'> <NotificationsIcon sx={{ color: '#2373a0' }} /> </Link>
          </StyledIconButton>

          <StyledIconButton>
            <Link to='/myProfile'> <AccountCircleIcon sx={{ color: '#2373a0' }} /> </Link>
          </StyledIconButton>
          <Link to='/myProfile' style={{ textDecoration: 'none' }}> <StyledTypography variant='h6' >{getUserName()}</StyledTypography> </Link>
          
        </Box>
      </StyledBox>
    </StyledAppBar>
  );
};


export default LoggedHeader;