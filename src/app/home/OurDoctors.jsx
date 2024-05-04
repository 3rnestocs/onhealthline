import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const ContainerContent = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '95vh', 
});

const StyledBox = styled(Box)({
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:'3vh',
    '&.titulo':{
        height:'30vh',
    },
    '&DoctorsBox':{
        height:'65vh',
        display:'flex',
        flexDirection:'row',

    },
    '&.DoctorsDataBox':{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px',
        flexGrow: '1',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        
    },
    '&.DoctorData': {
        display: 'flex',
        flexGrow: '0.8',
        padding: '3vh',
        justifyContent: 'center',
        flexDirection: 'column',
        border:'solid 4px #2373a0',
        borderRadius:'20px',
        alignItems:'center',
        margin:'1vh',
        boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 1)',

    },
});

const StyledTypography  =styled(Typography)({
    color:'#2373a0',
    margin:'5px'
})
const Doctores = [
    { 
        id: 1, 
        profile:'../../../public/assets/dr2.png',
        nombre: 'Dr. Gregory House', 
        rol: 'Medicina Interna',
        descripcion: 'Dedicada a prevenir, diagnosticar y tratar enfermedades comunes en pacientes de todas las edades. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. '
    },
    { 
        id: 2, 
        profile:'../../../public/assets/dr1.png',
        nombre: 'Dr. Shaun Murphy', 
        rol: 'Medicina Interna',
        descripcion: 'Dedicado a prevenir, diagnosticar y tratar enfermedades comunes en pacientes de todas las edades. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario.'
    },
    { 
        id: 3, 
        profile:'../../../public/assets/d3.png',
        nombre: 'Dr Ethan Choi', 
        rol: 'Pediatria',
        descripcion: 'Dedicada a prevenir, diagnosticar y tratar enfermedades comunes en pacientes pediátricos. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. '
    }
];

const DoctorData = ({ doctor }) => (
    <StyledBox className='DoctorData'>
        <Box>
            <img
                src={doctor.profile}
                alt="Profile Image"
                width={150}
                height={150}
                className="rounded-image"
            /> 
        </Box>
        <Typography variant="h6">{doctor.nombre}</Typography>
        <Typography variant="body1"><strong>Rol:</strong> {doctor.rol}</Typography>
        <Typography variant="body2">{doctor.descripcion}</Typography>
    </StyledBox>
);

export default function OurDoctors() {
  return (
    <Box sx={{flex: '1', textAlign: 'center',padding:'0', flexDirection:'column' }} >
      <ContainerContent>
            <StyledBox className='titulo'>
                <Typography variant='h1' sx={{color:'#2373a0'}}>Conozca a nuestros médicos</Typography>
            </StyledBox>
            <StyledBox className='DoctorsBox'>
                <StyledBox className='DoctorsDataBox'>
                    {Doctores.map((doctor) => (
                        <React.Fragment key={doctor.id}>
                            
                            <StyledBox className='DoctorData'>
                                <img 
                                    src={doctor.profile}
                                    alt="Profile Image"
                                    width={150}
                                    height={150}
                                    className="rounded-image"
                                />
                                <StyledTypography variant='h5' fontWeight={'bold'}>
                                    {doctor.nombre}
                                </StyledTypography>
                                <StyledTypography variant='h5'>
                                    {doctor.rol}
                                </StyledTypography>
                                <StyledTypography align='center'>
                                    {doctor.descripcion}
                                </StyledTypography>
                            </StyledBox>
                        </React.Fragment>

                    ))}
                </StyledBox>
            </StyledBox>
      </ContainerContent>
    </Box>
  );
}
