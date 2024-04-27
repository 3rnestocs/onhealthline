import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';

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
    padding: '5vh'
});

const usuariosDeEjemplo = [
    { id: 1, nombre: 'Dra. Meredith Grey', rol: 'Medicina Interna' },
    { id: 2, nombre: 'Dr. Alex Karev', rol: 'Medicina Interna' },
    { id: 3, nombre: 'Dra. Miranda Bailey', rol: 'Pediatria' },
    { id: 4, nombre: 'Dr. Derek Shepherd', rol: 'Psiquiatria' },
    { id: 5, nombre: 'Dra. Cristina Yang', rol: 'Dermatologia' }
];

function Specialists({ searchValue }) {
    const [usuarios, setUsuarios] = useState(usuariosDeEjemplo);

    useEffect(() => {
        // Filtrar usuarios solo si hay un valor de búsqueda válido
        if (searchValue) {
            const filteredUsuarios = usuariosDeEjemplo.filter(usuario =>
                usuario.nombre.toLowerCase().includes(searchValue.toLowerCase())  ||
                usuario.rol.toLowerCase().includes(searchValue.toLowerCase())
            );
            setUsuarios(filteredUsuarios);
        } else {
            // Si no hay un valor de búsqueda, mostrar todos los usuarios
            setUsuarios(usuariosDeEjemplo);
        }
    }, [searchValue]);

    return (
        <StyledBox>
            <List>
                {usuarios.map((usuario, index) => (
                    <React.Fragment key={usuario.id}>
                        <ListItem>
                            <ListItemText
                                primary={<StyledTypography variant='h5'>{usuario.nombre}</StyledTypography>}
                                secondary={<StyledTypography variant='h7' sx={{ marginLeft: '5vh' }}>{usuario.rol}</StyledTypography>}
                            />
                        </ListItem>
                        {index < usuarios.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </StyledBox>
    );
}

export default Specialists;
