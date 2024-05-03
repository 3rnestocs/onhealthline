// Specialists.jsx

import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import DoctorProfile from './DoctorProfile';

const StyledTypography = styled(Typography)({
    color: '#2373a0',
    padding: '5px',
    fontWeight: 'bold',
});

const StyledBox = styled(Box)({
    width: '100vh',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '5vh',
});

const StyledVerticalDivider = styled(Divider)({
    height: '25px',
    margin: '0 10px',
    backgroundColor: '#000000',
    borderRight: '3px solid #000000',
});

const usuariosDeEjemplo = [
    { 
        id: 1, 
        nombre: 'Dra. Meredith Grey', 
        rol: 'Medicina Interna',
        descripcion: 'Dedicada a prevenir, diagnosticar y tratar enfermedades comunes en pacientes de todas las edades. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. Médico cirujano en la Universidad Central de Venezuela. Médico general en la Universidad de Los Andes.'
    },
    { 
        id: 2, 
        nombre: 'Dr. Alex Karev', 
        rol: 'Medicina Interna',
        descripcion: 'Dedicado a prevenir, diagnosticar y tratar enfermedades comunes en pacientes de todas las edades. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. Médico cirujano en la Universidad Central de Venezuela. Médico general en la Universidad de Los Andes.'
    },
    { 
        id: 3, 
        nombre: 'Dra. Miranda Bailey', 
        rol: 'Pediatria',
        descripcion: 'Dedicada a prevenir, diagnosticar y tratar enfermedades comunes en pacientes pediátricos. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. Médico cirujano en la Universidad Central de Venezuela. Médico general en la Universidad de Los Andes.'
    },
    { 
        id: 4, 
        nombre: 'Dr. Derek Shepherd', 
        rol: 'Psiquiatria',
        descripcion: 'Dedicado a prevenir, diagnosticar y tratar trastornos psiquiátricos. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. Médico cirujano en la Universidad Central de Venezuela. Médico general en la Universidad de Los Andes.'
    },
    { 
        id: 5, 
        nombre: 'Dra. Cristina Yang', 
        rol: 'Dermatologia',
        descripcion: 'Dedicada a prevenir, diagnosticar y tratar enfermedades de la piel. Su enfoque está en la atención integral y la derivación adecuada a especialistas cuando sea necesario. Médico cirujano en la Universidad Central de Venezuela. Médico general en la Universidad de Los Andes.'
    }
];


function Specialists({ searchValue, onDoctorSelect }) {
    const [usuarios, setUsuarios] = useState(usuariosDeEjemplo);

    useEffect(() => {
        if (searchValue) {
            const filteredUsuarios = usuariosDeEjemplo.filter(usuario =>
                usuario.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
                usuario.rol.toLowerCase().includes(searchValue.toLowerCase())
            );
            setUsuarios(filteredUsuarios);
        } else {
            setUsuarios(usuariosDeEjemplo);
        }
    }, [searchValue]);

    return (
        <StyledBox>
            <List>
                {usuarios.map((usuario, index) => (
                    <React.Fragment key={usuario.id}>
                        <ListItem button onClick={() => onDoctorSelect(usuario)}>
                            <ListItemText
                                primary={<StyledTypography variant='h5'>{usuario.nombre}</StyledTypography>}
                            />
                            {index < usuarios.length && <StyledVerticalDivider />}
                            <ListItemText
                                secondary={<StyledTypography variant='h5'>{usuario.rol}</StyledTypography>}
                            />
                        </ListItem>
                        {index < usuarios.length && <Divider sx={{ borderBottom: '1px solid #ccc' }} />}
                    </React.Fragment>
                ))}
            </List>
        </StyledBox>
    );
}

export default Specialists;
