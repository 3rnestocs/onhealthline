import * as React from 'react';
import OButton from '@/components/OButton';
import OTextField from '@/components/OTextField';
import { InputAdornment, Checkbox, FormControlLabel, Radio, RadioGroup, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function Register() {
    const [checked, setChecked] = React.useState(false);
    const [gender, setGender] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [day, setDay] = React.useState('');
    const [year, setYear] = React.useState('');

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleDayChange = (event) => {
        // Limitar el número de caracteres a 2
        if (event.target.value.length <= 2) {
            // Convertir el valor a número y asegurarse de que esté entre 1 y 31
            const value = parseInt(event.target.value, 10);
            if (!isNaN(value) && value >= 1 && value <= 31) {
                setDay(value.toString());
            } else {
                setDay('');
            }
        }
    };

    const handleYearChange = (event) => {
        // Limitar el número de caracteres a 4
        if (event.target.value.length <= 4) {
            // Convertir el valor a número y asegurarse de que no sea mayor que el año actual
            const value = parseInt(event.target.value, 10);
            const currentYear = new Date().getFullYear();
            if (!isNaN(value) && value <= currentYear) {
                setYear(value.toString());
            } else {
                setYear('');
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/schedules');
    };

    return (
        <Grid container width={'50vw'} direction={'column'} alignItems='center' marginTop={1} component={'form'} onSubmit={handleSubmit}>
            {/* <form onSubmit={handleSubmit}> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <OTextField
                            topLabel="Nombre"
                            placeholder="Nombre"
                            inputType="personIcon"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <OTextField
                            topLabel="Cedula"
                            placeholder="Cedula"
                            inputType="custom"
                            icon={<InputAdornment position="start">V</InputAdornment>}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <OTextField
                            topLabel="Primer Apellido"
                            placeholder="Primer Apellido"
                            inputType="personIcon"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <OTextField
                            topLabel="Segundo Apellido"
                            placeholder="Segundo Apellido"
                            inputType="personIcon"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <OTextField
                            topLabel="Nombre de Usuario"
                            placeholder="Nombre de Usuario"
                            inputType="personIcon"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <OTextField
                            topLabel="Correo Electronico"
                            placeholder="Correo Electronico"
                            inputType="email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <OTextField
                            topLabel="Telefono"
                            placeholder="Telefono"
                            inputType="custom"
                            icon={<InputAdornment position="start">🚩</InputAdornment>}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <OTextField
                            topLabel="Contraseña"
                            placeholder="Contraseña"
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <OTextField
                            topLabel="Repetir Contraseña"
                            placeholder="Repetir Contraseña"
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <OTextField
                            topLabel="Año"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={year}
                            onChange={handleYearChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <OTextField
                            fullWidth
                            topLabel="Mes"
                            select
                            value={month}
                            onChange={handleMonthChange}
                        >
                            <MenuItem value={1}>Enero</MenuItem>
                            <MenuItem value={2}>Febrero</MenuItem>
                            <MenuItem value={3}>Marzo</MenuItem>
                            <MenuItem value={4}>Abril</MenuItem>
                            <MenuItem value={5}>Mayo</MenuItem>
                            <MenuItem value={6}>Junio</MenuItem>
                            <MenuItem value={7}>Julio</MenuItem>
                            <MenuItem value={8}>Agosto</MenuItem>
                            <MenuItem value={9}>Septiembre</MenuItem>
                            <MenuItem value={10}>Octubre</MenuItem>
                            <MenuItem value={11}>Noviembre</MenuItem>
                            <MenuItem value={12}>Diciembre</MenuItem>
                        </OTextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <OTextField
                            topLabel="Dia"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={day}
                            onChange={handleDayChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ color: '#10587e', marginBottom: '8px' }}>Género</Typography>
                        <RadioGroup value={gender} onChange={handleGenderChange} row>
                            <FormControlLabel value="male" control={<Radio sx={{ color: '#10587e' }} />} label="Masculino" sx={{ '& .Mui-checked': { color: '#10587e' } }} />
                            <FormControlLabel value="female" control={<Radio sx={{ color: '#10587e' }} />} label="Femenino" sx={{ '& .Mui-checked': { color: '#10587e' } }} />
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={handleChange} />}
                            label="Confirmo que soy mayor de 18 años y acepto la Política de privacidad y los Términos y condiciones de uso"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <OButton title="Crear mi cuenta" fullWidth={true}/>
                    </Grid>
                </Grid>
            {/* </form> */}
        </Grid>
    );
};
