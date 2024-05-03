import * as React from 'react';
import OButton from '@/components/OButton';
import OTextField from '@/components/OTextField';
import { InputAdornment, Checkbox, FormControlLabel, Radio, RadioGroup, Grid, Typography, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';
import { useAuth } from '@/api/authProvider';

export default function Register({ tipoUsuario }) {
    const { registerAction } = useAuth();
    const [checked, setChecked] = useState(false);
    const [gender, setGender] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        second_last_name: '',
        phone: '',
        sex: '',
        birthdate: tipoUsuario === 'paciente' ? '' : null,
        address: '',
        descripcion: tipoUsuario === 'medico' ? '' : null,
        id_especialidad: tipoUsuario === 'medico' ? '' : null,
        user_type: tipoUsuario.toUpperCase()
    });
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (name === 'confirmpassword') {
            setConfirmPassword(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        updateBirthdate(day, event.target.value, year);
    };

    const handleDayChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 31) {
            setDay(value.toString());
            updateBirthdate(value.toString(), month, year);
        }
    };

    const handleYearChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const currentYear = new Date().getFullYear();
        if (!isNaN(value) && value <= currentYear) {
            setYear(value.toString());
            updateBirthdate(day, month, value.toString());
        }
    };

    const updateBirthdate = (day, month, year) => {
        const formattedDate = `${year}-${month}-${day}`;
        setFormData({ ...formData, birthdate: formattedDate });
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const key in formData) {
            if (!formData[key]) {
                setError('Por favor, completa todos los campos.');
                return;
            }
        }

        if (tipoUsuario === 'paciente') {
            if (!formData.birthdate || !formData.birthdate.includes('-')) {
                setError('Por favor, selecciona una fecha de nacimiento válida.');
                return;
            }
        } else {
            // validaciones para medico
        }

        if (formData.password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        // Log form data
        console.log("request 1:", formData);
        // Perform registration action
        registerAction(formData);
    };

    return (
        <Grid container width={'50vw'} direction={'column'} alignItems='center' marginTop={1} component={'form'} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* Common fields */}
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Nombre"
                        placeholder="Nombre"
                        inputType="personIcon"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Cedula"
                        placeholder="Cedula"
                        name="id"
                        inputType="custom"
                        icon={<InputAdornment position="start">V</InputAdornment>}
                        value={formData.id}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Primer Apellido"
                        placeholder="Primer Apellido"
                        inputType="personIcon"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Segundo Apellido"
                        placeholder="Segundo Apellido"
                        inputType="personIcon"
                        name="second_last_name"
                        value={formData.second_last_name}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Correo Electronico"
                        placeholder="Correo Electronico"
                        inputType="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Telefono"
                        placeholder="Telefono"
                        inputType="custom"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        icon={<PhoneIcon position="start" />}
                    />
                </Grid>
                <Grid item xs={12} sm={tipoUsuario == "medico" ? 6 : 12}>
                    <OTextField
                        topLabel="Direccion"
                        placeholder="Direccion"
                        inputType="custom"
                        icon={<HomeIcon position="start" />}
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />
                </Grid>
                {tipoUsuario === 'medico' && (
                    <Grid item xs={12} sm={6} container spacing={2}>
                        <Grid item>
                            <OButton
                                title="CV"
                                icon={<UploadIcon />}
                            />
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                                accept='.pdf'
                            />
                        </Grid>
                        <Grid item xs>
                            <OTextField
                                topLabel=""
                                placeholder="Nombre del archivo"
                                inputType="custom"
                                value={selectedFile ? selectedFile.name : ''}
                                disabled
                            />
                        </Grid>
                    </Grid>
                )}
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Contraseña"
                        placeholder="Contraseña"
                        inputType="password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OTextField
                        topLabel="Repetir Contraseña"
                        placeholder="Repetir Contraseña"
                        inputType="password"
                        name="confirmpassword"
                        onChange={handleFormChange}
                    />
                </Grid>
                {tipoUsuario === 'medico' && (
                    <>
                        <Grid item xs={12}>
                            <OTextField
                                multiline
                                rows={4}
                                fullWidth
                                topLabel="Descripcion medica"
                                placeholder="Escribe una breve descripcion sobre tus labores medicas aquí"
                                inputType="custom"
                                name="message"
                                value={formData.message}
                                onChange={handleFormChange}
                            />
                        </Grid>
                    </>
                )}
                {tipoUsuario === 'paciente' && (
                    <>
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
                            <RadioGroup value={gender} name='sex' onChange={handleGenderChange} row>
                                <FormControlLabel value="0" control={<Radio sx={{ color: '#10587e' }} />} label="Masculino" sx={{ '& .Mui-checked': { color: '#10587e' } }} />
                                <FormControlLabel value="1" control={<Radio sx={{ color: '#10587e' }} />} label="Femenino" sx={{ '& .Mui-checked': { color: '#10587e' } }} />
                            </RadioGroup>
                        </Grid>
                    </>
                )}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                        label="Confirmo que soy mayor de 18 años y acepto la Política de privacidad y los Términos y condiciones de uso"
                    />
                </Grid>
                <Grid item xs={12}>
                    <OButton title="Crear cuenta" fullWidth={true} height='100%' />
                    {error && (
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};