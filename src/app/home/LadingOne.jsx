import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const ContainerContent = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '95vh', 
  marginTop:'0.5vh'
});

const ImageBackground = styled('img')({
  width: '100%',
  height: '100%', 
  objectFit: 'cover', 
});

const OverlayText = styled(Typography)({
  position: 'absolute',
  top: '50%', 
  left: '50%', 
  transform: 'translate(-50%, -50%)',
  color: 'white', 
  zIndex: 1,
  fontSize:'100px',
  fontWeight:'bold'
});


export default function LadingOne() {
  return (
    <Box sx={{flex: '1', textAlign: 'center',padding:'0', flexDirection:'column' }} >
      <ContainerContent>
        <ImageBackground src="../../../public/assets/homelanding.png" alt="Background Image" />
        <OverlayText variant="h3">Consulta En linea</OverlayText>
      </ContainerContent>
    </Box>
  );
}
