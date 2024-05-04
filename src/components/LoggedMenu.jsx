import React from "react"
import { List, ListItem, IconButton, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'


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
    return (

        <Box sx={{ display: 'flex', padding: '30px 10px' }}>
            <List>
                <ListItem>
                    <Link to='/schedules'>
                        <img
                            alt='menu date'
                            src={"../../public/assets/ICONMenuDate.PNG"}
                            width={50} height={50}
                        />
                    </Link>

                    <Link to='/schedules' style={{ textDecoration: 'none' }}>
                        <StyledTypography> Agendar Cita</StyledTypography>
                    </Link>
                </ListItem>

                <ListItem>

                    <Link to='/myschedules'>
                        <img
                            alt='medical date'
                            src={"../../public/assets/ICONmeddate.PNG"}
                            width={50} height={50}
                        />

                    </Link>


                    <Link to='/myschedules' style={{ textDecoration: 'none' }}>
                        <StyledTypography> Mis Citas</StyledTypography>
                    </Link>
                </ListItem>




                <ListItem>
                    <Link to='/'>
                        <img
                            alt='menu profile'
                            src={"../../public/assets/ICONMenuProfile.PNG"}
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