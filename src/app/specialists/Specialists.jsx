import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import DoctorProfile from '../profile/DoctorProfile';
import { useAuth } from '../../api/authProvider'

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

function Specialists({ searchValue, onDoctorSelect }) {
    const [doctors, setDoctors] = useState([]);
    const { listAllDoctors } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorsData = await listAllDoctors();
                setDoctors(doctorsData);
            } catch (error) {
                console.error('Error fetching doctors:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <StyledBox>
            <List>
                {doctors.map((doctor, index) => (
                    <React.Fragment key={doctor.id}>
                        <ListItem button onClick={() => onDoctorSelect(doctor)}>
                            <ListItemText
                                primary={<StyledTypography variant='h5'>{doctor.nombre}</StyledTypography>}
                            />
                            {index < doctors.length && <StyledVerticalDivider />}
                            <ListItemText
                                secondary={<StyledTypography variant='h5'>{doctor.especialidad}</StyledTypography>}
                            />
                        </ListItem>
                        {index < doctors.length && <Divider sx={{ borderBottom: '1px solid #ccc' }} />}
                    </React.Fragment>
                ))}
            </List>
        </StyledBox>
    );
}

export default Specialists;
