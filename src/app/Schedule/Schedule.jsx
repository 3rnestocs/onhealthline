import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Button, MenuItem } from '@mui/material'
import { styled } from '@mui/system';
import { useAuth } from '../../api/authProvider';
import OTextField from '../../components/OTextField';

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
        width: '50vh',
        alignItems: 'center',
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
    border: 'solid 2px #000000',
})

const Schedule = ({ doctorData, onReturn }) => {
    const today = new Date();
    const { cedula, nombre } = doctorData;
    const [selectedDate, setSelectedDate] = useState(today);
    const { requestDoctorSchedule } = useAuth();
    const [schedule, setSchedule] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState([]);
    const [formData, setFormData] = useState({
        start_at: '',
        end_at: '',
        doctor_id: cedula
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scheduleData = await requestDoctorSchedule(cedula);
                setSchedule(scheduleData[0]);
                console.log('scheduleDAta', scheduleData[0].dias_semana)
                setAvailableHours(segmentHours(scheduleData[0].hora_inicio, scheduleData[0].hora_fin));
            } catch (error) {
                console.error('Error fetching schedule:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleDateRangeSelection = (event) => {
        const hour = event.target.value;
        setSelectedHour(hour);
    };

    const segmentHours = (horaInicio, horaFin) => {
        const startTime = parseInt(horaInicio.split(':')[0]);
        const endTime = parseInt(horaFin.split(':')[0]);
        const segments = [];

        for (let i = startTime; i < endTime; i++) {
            const timeSlot = `${i > 12 ? i - 12 : i}${i < 12 ? 'AM' : 'PM'}-${(i + 1) > 12 ? (i + 1) - 12 : (i + 1)}${(i + 1) < 12 ? 'AM' : 'PM'}`;
            segments.push(timeSlot);
        };

        return segments;
    };

    const getDayName = (date) => {
        const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        return days[date.getDay() - 1];
    };

    const isSelectableDay = (date) => {
        const dayName = getDayName(date);
        if (dayName && schedule) {
            const sanitizedDays = schedule.dias_semana.map(day => day.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            return sanitizedDays.includes(dayName);
        } else {
            return false;
        }
    };


    const tileDisabled = ({ date }) => {
        return !isSelectableDay(date);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log('fecha seleccionada:', date)
    };

    return (
        <ContainerContent>
            <StyledTypography variant='h3' sx={{ mb: '5vh' }}>Agenda tu consulta</StyledTypography>

            <StyledBox className='Main_Box'>
                <Calendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDate={today} // Evitar fechas anteriores a la actual
                    tileDisabled={tileDisabled} // Disable dates not included in dias_semana
                />

                <StyledBox className='ScheduleMain_Box'>

                    <StyledBox className='ScheduleButton_Box'>

                        <StyledTypography variant='h6'>
                            Horario Mañana {nombre} - {cedula}
                        </StyledTypography>
                        <OTextField
                            required
                            topLabel="Hora de inicio"
                            select
                            name='horario'
                            value={selectedHour}
                            onChange={handleDateRangeSelection}
                            fullWidth
                        >
                            {availableHours.map((hour, index) => (
                                <MenuItem key={index} value={hour}>{hour}</MenuItem>
                            ))}
                        </OTextField>
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

                <StyledButton className='return' onClick={onReturn}>Volver</StyledButton>

                <StyledButton className='scheduleSubmit'>Agendar</StyledButton>
            </StyledBox>

        </ContainerContent>
    );
}

export default Schedule;

