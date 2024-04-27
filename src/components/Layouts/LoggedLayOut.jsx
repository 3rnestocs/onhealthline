//LogedLayout.js
import React from 'react';
import LoggedHeader from '../LoggedHeader';
import {Box} from '@mui/material'
import {styled} from '@mui/system'
import LoggedMenu from '../LoggedMenu';

const StyledBox = styled(Box)({
    '&.Left-Box':{
      display:'flex',
      width:'360px',
      backgroundColor:'#2373a0',
      height:'90.6vh',
      borderRadius:'5px'
    }
})



const LoggedLayOut = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <LoggedHeader />

      {/* Contenido de la página */}
      <main style={{ flex: '1', textAlign: 'center',}}>
      <StyledBox className='Main-Box' sx={{display:'flex',flexDirection:'row'}}>

        <StyledBox className='Left-Box'>
          <LoggedMenu />
        </StyledBox>

        <StyledBox className='Content-Box'>
          {children}
        </StyledBox>   
      </StyledBox>     
      </main>

      
    </div>
  );
};

export default LoggedLayOut;