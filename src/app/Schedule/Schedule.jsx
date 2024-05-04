import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { styled } from '@mui/system';

const StyledTypography = styled(Typography)({
    color: '#2373a0',
    alignItems: 'center',
    fontWeight: 'bold',
});

const ContainerContent = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '120vh',
    height: '70vh',
    padding: '5vh 20vh',
    flexDirection: 'column',
});

const StyledBox = styled(Box)({
    '&.Main_Box': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }, '&.Button_Box': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }, '&.ScheduleMain_Box': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    }, '&.ScheduleButton_Box': {
        display: 'flex',
        flexDirection: 'column',
        width: '40vh',
        alignItems: 'center  '
    }
})

const StyledButton = styled(Button)({
    border: '4px solid #2373a0',
    borderRadius: '15px',
    minWidth: '300px',
    minHeight: '70px',

    '&.return': {
        color: '#2373a0',
    }, '&.scheduleSubmit': {
        color: '#ffffff',
        backgroundColor: '#2373a0',

    }, '&schedule': {
        backgroundColor: '#2373a0',
        color: '#ffffff',
        maxWidth: '100px',
        minHeight: '30px',

    }
})

const ScheduleButton = styled(Button)({
    backgroundColor: '#2373a0',
    color: '#ffffff',
    minWidth: '100px',
    minHeight: '30px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
    margin: '2vh',
    borderRadius: '30px',
    border: 'solid 2px #000000'
})




const Schedule = () => {
    // Obtener la fecha actual
    const today = new Date();

    // Estado para almacenar la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState(today);

    // Función para manejar los cambios en la fecha seleccionada
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <ContainerContent>
            <StyledTypography variant='h3' sx={{ mb: '5vh' }}>Agenda tu consulta</StyledTypography>

            <StyledBox className='Main_Box'>
                <Calendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDate={today} // Evitar fechas anteriores a la actual
                />

                <StyledBox className='ScheduleMain_Box'>

                    <StyledBox className='ScheduleButton_Box'>

                        <StyledTypography variant='h6'>
                            Horario Mañana
                        </StyledTypography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                            <ScheduleButton >9:00</ScheduleButton>
                            <ScheduleButton >10:00</ScheduleButton>

                        </Box>

                    </StyledBox>

                    <StyledBox className='ScheduleButton_Box'>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                alt='icono de calendario'
                                src={'/assets/ICONCalendarNo.png'} width={50} height={50}
                            />
                            <StyledTypography variant='h6'>
                                Horario Tarde
                            </StyledTypography>
                        </Box>



                    </StyledBox>

                </StyledBox>

            </StyledBox>

            <StyledTypography variant='h6' sx={{ mt: '5vh', mb: '5vh' }}>Los horarios pueden variar según la disponibilidad del doctor y el día.</StyledTypography>

            <StyledBox className='Button_Box'>

                <StyledButton className='return'>Volver</StyledButton>

                <StyledButton className='scheduleSubmit'>Agendar</StyledButton>
            </StyledBox>

        </ContainerContent>
    );
}

export default Schedule;

