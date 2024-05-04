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
    const { agendarCita } = useAuth();
    const [schedule, setSchedule] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scheduleData = await requestDoctorSchedule(cedula);
                setSchedule(scheduleData[0]);
                console.log('scheduleData', scheduleData[0].dias_semana)
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

    const handleAgendar = async (event) => {
        event.preventDefault();

        const { startDate, endDate } = generateDateTimeStrings(selectedDate, selectedHour);

        const formData = {
            start_at: startDate,
            end_at: endDate,
            doctor_id: cedula
        }
        console.log('data:', formData)
        agendarCita(formData);
    }

    const convertTo24Hour = (time) => {
        let [hours, minutes, period] = time.match(/^(\d{1,2})(?::(\d{2}))?\s*([ap]m)?$/i).slice(1, 4);
        hours = parseInt(hours, 10);
        if (period == 'AM' && hours === 12) {
            hours = 0; // Handle 12AM as 0
        } else if (period == 'PM' && hours < 12) {
            hours += 12; // Add 12 hours for PM times except 12PM
        }
        if (hours < 10) hours = '0' + hours; // Add leading zero if single digit
        if (minutes == undefined) minutes = '00'; // Default to '00' if not provided
        if (minutes.length == 1) minutes = '0' + minutes; // Add leading zero if single digit
        return `${hours}:${minutes}:00`;
    };

    const generateDateTimeStrings = (selectedDate, selectedHour) => {
        // Step 1: Extract year, month, and day from selectedDate
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');

        // Step 2: Extract start and end times from selectedHour
        const [start, end] = selectedHour.split('-');

        // Step 3: Convert start and end times to 24-hour format and split them into hours and minutes
        const startHour = convertTo24Hour(start)
        const endHour = convertTo24Hour(end)

        // Step 4: Combine date, hours, and minutes to create start_at and end_at strings
        const startDate = `${year}-${month}-${day}T${String(startHour).padStart(2, '0')}`;
        const endDate = `${year}-${month}-${day}T${String(endHour).padStart(2, '0')}`;

        return { startDate, endDate };
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
                            Horario de {nombre} - {cedula}
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

                    <Box margin={'auto'}>
                        <StyledTypography variant='h6'>Los horarios pueden variar según </StyledTypography>
                        <StyledTypography variant='h6'>la disponibilidad del doctor y el día.</StyledTypography>
                    </Box>
                </StyledBox>

            </StyledBox>
            <StyledBox className='Button_Box' sx={{ mt: 5 }}>

                <StyledButton className='return' onClick={onReturn}>Volver</StyledButton>

                <StyledButton className='scheduleSubmit' onClick={handleAgendar}>Agendar</StyledButton>
            </StyledBox>

        </ContainerContent>
    );
}

export default Schedule;

