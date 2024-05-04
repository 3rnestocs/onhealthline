import React from "react"
import { List, ListItem, IconButton, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import { getUser } from "../utils/localStorageHelper";
import IConDate from '../assets/ICONMenuDate.png'
import myDates from '../assets/ICONmeddate.png'
import miPerfil from '../assets/ICONMenuProfile.png'
const StyledIconButton = styled(IconButton)({
    color: '#ffffff',
    padding: '5px',
    marginRight: '10px',
    '& svg': {
        fontSize: '2.5rem',
    },
});

const StyledTypography = styled(Typography)({
    color: '#ffffff',
    padding: '5px',
    fontWeight: 'bold',
})

const LoggedMenu = () => {
    const usuario = getUser();

    return (

        <Box sx={{ display: 'flex', padding: '30px 10px' }}>
            <List>
                {usuario.user_type == 'PACIENTE' && (
                    <ListItem>
                    <Link to='/schedules'>
                        <img
                            alt='menu date'
                            src={IConDate}
                            width={50} height={50}
                        />
                    </Link>

                    <Link to='/schedules' style={{ textDecoration: 'none' }}>
                        <StyledTypography> Agendar Cita</StyledTypography>
                    </Link>
                </ListItem>
                )}

                <ListItem>

                    <Link to='/myschedules'>
                        <img
                            alt='medical date'
                            src={myDates}
                            width={50} height={50}
                        />

                    </Link>


                    <Link to='/myschedules' style={{ textDecoration: 'none' }}>
                        <StyledTypography> Mis Citas</StyledTypography>
                    </Link>
                </ListItem>




                <ListItem>
                    <Link to='/myProfile'>
                        <img
                            alt='profile'
                            src={miPerfil}
                            width={50} height={50}
                        />
                    </Link>

                    <Link to='/myProfile' style={{ textDecoration: 'none' }}>
                        <StyledTypography> Mi Perfil</StyledTypography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to='/'>
                        <StyledIconButton>
                            <LogoutIcon />
                        </StyledIconButton>
                    </Link>

                    <Link to='/ ' style={{ textDecoration: 'none' }}>
                        <StyledTypography> Cerrar sesion</StyledTypography>
                    </Link>
                </ListItem>
            </List>
        </Box>

    );
};
export default LoggedMenu;