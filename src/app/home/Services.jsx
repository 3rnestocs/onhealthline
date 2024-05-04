import React from 'react';
import { Container, Typography, Box,Grid } from '@mui/material';
import { styled } from '@mui/system';

const ContainerContent = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '95vh', 
  backgroundColor:'#2373a0',
});

const StyledBox = styled(Box)({
    display:'flex',
    flexDirection:'column',
    marginTop:'3vh',
    '&.titulo':{
        height:'10vh',
    },'&.ServicesBox':{
        height:'65vh',
        display:'flex',
        flexDirection:'row',
    },'&.ServicesData':{
        display: 'flex',
        flexGrow: '0.8',
        padding: '3vh',
        justifyContent: 'center',
        flexDirection: 'column',
        border:'solid 4px #ffffff',
        borderRadius:'20px',
        alignItems:'center',
        boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 1)',
        backgroundColor:'#ffffff'
    }
    
});

const StyledTypography  =styled(Typography)({
    color:'#2373a0',
    margin:'5px'
})

const StyledGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Servicios = [
    { 
        id: 1, 
        profile:'../../../public/assets/service1.png',
        nombre: 'Consultas virtuales', 
        descripcion: 'Nueva via de comunicacion entre paciente y doctor mediante videollamadas'
    },
    { 
        id: 2, 
        profile:'../../../public/assets/service2.png',
        nombre: 'Gestionar pruebas complementarias', 
        descripcion: 'Subir y visualizar informacion medica como analisis, imagenes fotos etc'
    },
    { 
        id: 3, 
        profile:'../../../public/assets/service3.png',
        nombre: 'Agendas de Citas', 
        descripcion: 'Configurar y reservar citas desde donde quieras'
    },
    { 
        id: 4, 
        profile:'../../../public/assets/service4.png',
        nombre: 'Generar Recipe Medico', 
        descripcion: 'Recibe ordenes de prescripcion y tratamiento de medicamentos'
    },
    
];

export default function Services() {
  return (
    <Box sx={{flex: '1', textAlign: 'center',padding:'0', flexDirection:'column' }} >
      <ContainerContent>
            <StyledBox className='titulo'>
                <Typography variant='h1' sx={{color:'#ffffff'}}>Servicios de OnHealthLine</Typography>
            </StyledBox>
            <StyledBox className='ServicesBox'>
                <Grid container spacing={6}>
                {Servicios.map((servicios) => (
                        <React.Fragment key={servicios.id}>
                            <StyledGrid item xs={6} md={6}>
                                <StyledBox className='ServicesData'>
                                    <img 
                                        src={servicios.profile}
                                        alt="Profile Image"
                                        width={150}
                                        height={150}
                                        className="rounded-image"
                                    />
                                    <StyledTypography variant='h4' fontWeight={'bold'}>
                                        {servicios.nombre}
                                    </StyledTypography>
                                  
                                    <StyledTypography align='center' variant='h5'>
                                        {servicios.descripcion}
                                    </StyledTypography>
                                </StyledBox>
                            </StyledGrid>
                            
                        </React.Fragment>

                    ))}
                    
                </Grid>
            </StyledBox>
      </ContainerContent>
    </Box>
  );
}
