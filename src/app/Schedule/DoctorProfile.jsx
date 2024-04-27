import React, { useState, useEffect } from 'react';
import {Box, Typography,Divider,Button} from '@mui/material'
import { styled } from '@mui/system';
import {Link} from 'react-router-dom'
import Image from 'next/image'


const ContainerContent = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '120vh',
    height: '70vh',
    padding: '10vh',
    marginTop:'2vh',
    marginLeft:'10vh',
    flexDirection:'column'
});


const StyledBox= styled(Box)({
    '&.Main_Box':{
        display:'flex',
        flexDirection:'row',
        width:'100vh',
        height: '60vh',


    },'&.Info_Box':{
        display:'flex',
        flexDirection:'column',
        margin:'1vh'
    },'&.Buttons':{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        margin:'auto 0'
    }
    
})
const StyledTypography = styled(Typography)({
    color: '#2373a0',
    fontWeight: 'bold',
    padding:'1vh'
});


const StyledButton = styled(Button)({
    border:'4px solid #2373a0',
    borderRadius:'15px',
    minWidth:'300px',
    minHeight:'70px',

    '&.return':{
        color:'#2373a0',
    },'&.schedule':{
        color:'#ffffff',
        backgroundColor:'#2373a0',
        
    },
})


const DoctorProfile = () => {
    return (
        <ContainerContent>
            <StyledBox className='Main_Box'>
                <StyledBox className='Info_Box'>
                    <StyledTypography align='left' variant='h3'>
                        Dr(a). Meredith Grey
                    </StyledTypography>

                    <Divider  sx={{ borderBottom: '4px solid #000000'}}/>

                    <StyledTypography align='left' variant='h5'>
                        Especialidad: Medicina General
                    </StyledTypography>

                    <StyledTypography align='justify'>
                        Dedicada a prevenir, diagnosticar y tratar enfermedades comunes en pacientes de todas las edades.
                        Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario.

                    </StyledTypography>

                    <StyledTypography align='justify'>
                        Médico cirujano en la Universidad Central de Venezuela.
                        Medico general en la Universidad de Los Andes.
                    </StyledTypography>

                </StyledBox>

                <StyledBox className="Image_Box">
                <Image
                src={'/assets/drdefault.png'}
                width={400}
                height={400}
                className="rounded-image"

                />
                </StyledBox>

            </StyledBox>

            <StyledBox className='Buttons'>
                
                <StyledButton className='return'>
                    Volver
                </StyledButton>

                <StyledButton className='schedule'>
                    Agendar tu Consulta
                </StyledButton>
            </StyledBox>

        </ContainerContent>
    );


};


export default DoctorProfile