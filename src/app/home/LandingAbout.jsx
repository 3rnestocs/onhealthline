import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import homeBg from '../../assets/home2.png'

const ContainerContent = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '95vh', 

});

const ImageBackground = styled('img')({
  width: '100%',
  height: '100%', 
  objectFit: 'cover', 
  opacity:'0.5'
});

const OverlayText = styled(Typography)({
  position: 'absolute',
  top: '50%', 
  left: '50%', 
  transform: 'translate(-50%, -100%)',
  color: '#2373a0', 
  zIndex: 1,
  fontSize:'100px',

});


export default function LadingAbout() {
  return (
    <Box sx={{flex: '1', textAlign: 'center',padding:'0', flexDirection:'column' }} >
      <ContainerContent>
        <ImageBackground src={homeBg} />
        <OverlayText variant="h3">Comprometidos contigo</OverlayText>
        <OverlayText sx={{color:'#000000',transform: 'translate(-50%)',fontSize:'30px',}}>OnHealthLine es el proveedor de atencion medica mas confiable de la region. Contamos con un equipo altamente capaciado de expertos medicos, instalaciones avanzadas y un compromiso inquebrantable con el bienestar de nuestros pacientes </OverlayText>
      </ContainerContent>
    </Box>
  );
}
