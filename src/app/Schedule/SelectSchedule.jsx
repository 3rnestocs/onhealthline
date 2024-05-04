import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Typography, Divider, MenuItem, Select, Grid, Chip, OutlinedInput, InputLabel, FormControl, Box } from '@mui/material';
import OTextField from '../../components/OTextField';
import OButton from '../../components/OButton';
import { API_URL_BACKEND } from '../../api/authProvider';
import { getUser } from '../../utils/localStorageHelper';
import {useNavigate} from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ContainerContent = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '150vh',
    height: '70vh',
    padding: '5vh',
    flexDirection: 'row',
});

const GridContainer = styled(Box)({
    flexGrow: 0.5,
});

const StyledTypography = styled(Typography)({
    color: '#2373a0',
    padding: '5px',
    fontWeight: 'bold',
});

const SelectSchedule = () => {
    const usuario = getUser();
    const theme = useTheme();
    const [days, setAvailableDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const availableDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const availableHours = [
        '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'
    ]
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        dias_semana: [],
        hora_inicio: '',
        hora_fin: '',
        doctor: usuario.id
    });
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

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
    const navigate = useNavigate();
    const handleStartTimeChange = (event) => {
        const selectedTime = event.target.value;
        const formattedTime = convertTo24Hour(selectedTime);
        setStartTime(selectedTime);
        setEndTime('');
        setFormData({ ...formData, [event.target.name]: formattedTime });
    };

    const handleEndTimeChange = (event) => {
        const selectedTime = event.target.value;
        const formattedTime = convertTo24Hour(selectedTime);
        setEndTime(selectedTime);
        setFormData({ ...formData, [event.target.name]: formattedTime });
    };

    const handleDaySelection = (event) => {
        const {
            target: { value },
        } = event;
        setAvailableDays(
            typeof value === 'string' ? value.split(',') : value,
        );
        setFormData({ ...formData, [event.target.name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('data:', formData);
        var hasError = false;
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === ' ' || formData[key] === "" || formData[key] === " ") {
                hasError = true;
                console.log('has error void:', hasError, formData[key], key)
                break;
            }
        }

        if (hasError === true) {
            return;
        }

        try {
            const response = await fetch(`${API_URL_BACKEND}/medico/horario/crear/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.message}`);
            }

            const res = await response.json();

            if (res.titulo == formData.titulo) {
                console.log("response success:", res);
                navigate('/myProfile')
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            throw new Error(err);
        }

    };

    return (
        <ContainerContent>
            <GridContainer>
                <Grid container width={'50%'} margin={'auto'} component={'form'} spacing={2} onSubmit={handleSubmit}>
                    <Grid item xs sm={12}>
                        <StyledTypography variant='h4' sx={{ opacity: "1", textAlign: "center" }}>Configuración de horario</StyledTypography>
                    </Grid>
                    <Grid item xs sm={12}>
                        <Typography variant="body1">
                            Los horarios de atención al público están comprendidos entre las 7 AM y las 7 PM. El sistema tomará el rango de horario seleccionado y lo dividirá en bloques de atención de 1 hora, para un máximo de 12 consultas por día de atención. Puedes escoger la cantidad de dias que veas pertinente, hasta un maximo de cinco, contando de lunes a viernes.
                        </Typography>
                    </Grid>
                    <Divider sx={{ my: 2, backgroundColor: 'gray', height: '1px' }} />
                    <Grid item xs sm={12}>
                        <OTextField
                            topLabel="Título de la consulta"
                            placeholder="Describe brevemente el motivo de la consulta"
                            inputType="text"
                            name="titulo"
                            required
                            fullWidth
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs sm={12}>
                        <FormControl fullWidth >
                            <InputLabel>Seleccionar días de consulta</InputLabel>
                            <Select
                                required
                                multiple
                                fullWidth
                                name='dias_semana'
                                value={days}
                                onChange={handleDaySelection}
                                input={<OutlinedInput label="Seleccionar días de consulta" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                sx={{
                                    backgroundColor: '#f2f2f2',
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2376a1',
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: '#2376a1',
                                    },
                                }}
                                MenuProps={MenuProps}
                            >
                                {availableDays.map((day) => (
                                    <MenuItem
                                        key={day}
                                        value={day}
                                    >
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs sm={12}>
                        <OTextField
                            topLabel="Descripción de la consulta"
                            placeholder="Describe como es tu consulta y que tipo de resultados das"
                            inputType="text"
                            name="descripcion"
                            required
                            fullWidth
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs sm={6}>
                        <OTextField
                            required
                            topLabel="Hora de inicio"
                            select
                            name='hora_inicio'
                            value={startTime}
                            onChange={handleStartTimeChange}
                            fullWidth
                        >
                            {availableHours.map((hour, index) => (
                                <MenuItem key={index} value={hour}>{hour}</MenuItem>
                            ))}
                        </OTextField>
                    </Grid>
                    <Grid item xs sm={6}>
                        <OTextField
                            required
                            topLabel="Hora de fin"
                            select
                            value={endTime}
                            name='hora_fin'
                            onChange={handleEndTimeChange}
                            fullWidth
                        >
                            {startTime &&
                                availableHours
                                    .filter(hour => availableHours.indexOf(hour) > availableHours.indexOf(startTime))
                                    .map((hour, index) => (
                                        <MenuItem key={index} value={hour}>{hour}</MenuItem>
                                    ))
                            }
                        </OTextField>
                    </Grid>
                    <Grid item xs sm={12}>
                        <OButton title="Guardar horario" fullWidth={true} />
                    </Grid>
                </Grid>
            </GridContainer>
        </ContainerContent>
    );
};

export default SelectSchedule;
