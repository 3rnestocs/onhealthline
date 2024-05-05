import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Grid } from '@mui/material'
import { styled } from '@mui/system';
import OTextField from '../../components/OTextField';
import { getUser } from '../../utils/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import profilePhoto from '../../assets/defaultProfile.png'
import { useAuth } from '../../api/authProvider';

const ContainerContent = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '150vh',
    height: '70vh',
    padding: '5vh',
    flexDirection: 'row',
});

const StyledButton = styled(Button)({
    border: '4px solid #10587e',
    borderRadius: '8px',
    minWidth: '300px',
    minHeight: '50px',
    maxHeight: '50px',
    color: '#ffffff',
    backgroundColor: '#10587e',
    opacity: '1',
    margin: '10px',
    '&:hover': {
        opacity: '0.8',
        backgroundColor: '#10587e',
    },
    '&disabled': {
        opacity: '0.5',
        backgroundColor: '#10587e',
        color: '#ffffff',
    },
})

const StyledBox = styled(Box)({
    '&.MainProfileBox': {
        display: 'flex',
        width: '50vh',
        height: '80vh',
        marginRight: '3vh',
        flexDirection: 'column',
    },
    '&.MainSettingsBox': {
        display: 'flex',
        flexGrow: '1',
        height: '80vh',
        flexDirection: 'column'
    },
    '&.ProfileDataBox': {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        margin: '10px',
        flexGrow: '1',
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    '&.ProfileImage': {
        background: 'linear-gradient(to bottom,rgba(16, 88, 126, 0.7) , rgba(35, 118, 161, 0.5),rgba(230, 249, 246, 0.7) )',
        borderRadius: '20px 20px 0 0',
    },
    '&.ProfileData': {
        display: 'flex',
        flexGrow: '0.8',
        padding: '3vh',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    '&.SettingsData': {
        display: 'flex',
        flexGrow: '0.1',
        pointerEvents: (props) => props.editMode ? 'auto' : 'none' // Se ajusta pointerEvents según editMode
    },
    '&.SettingsPassword': {
        display: 'flex',
        flexGrow: '0.5',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '10px'
    }
})

const StyledTypography = styled(Typography)({
    color: '#2373a0',
    padding: '5px',
    fontWeight: 'bold',
});

const StyledGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2vh'
});

const MyProfile = () => {
    const navigate = useNavigate();
    const { actualizarPerfil } = useAuth();
    const usuario = getUser();
    const [editMode, setEditMode] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordFieldsNotEmpty, setPasswordFieldsNotEmpty] = useState(false);
    const [formData, setFormData] = useState({
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        phone: usuario.phone,
        descripcion: usuario.descripcion,
        address: usuario.address
    });

    const handleSelectSchedule = () => {
        navigate('/select-schedule');
    };
    
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const applyChanges = () => {
        actualizarPerfil(usuario.id, formData);
        setEditMode(!editMode);
    };
    
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setPasswordMatch(event.target.value === confirmNewPassword);
        setPasswordFieldsNotEmpty(event.target.value !== '' && confirmNewPassword !== '');
    };

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
        setPasswordMatch(event.target.value === newPassword);
        setPasswordFieldsNotEmpty(event.target.value !== '' && newPassword !== '');
    };

    return (
        <ContainerContent>
            <StyledBox className='MainProfileBox'>
                <StyledTypography variant='h6' sx={{ opacity: "0.7", textAlign: "left" }}>Mi Perfil</StyledTypography>
                <StyledBox className='ProfileDataBox'>
                    <StyledBox className='ProfileImage'>
                        <img
                            src={profilePhoto}
                            alt="Profile Image"
                            width={150}
                            height={150}
                            className="rounded-image"
                        />
                    </StyledBox>
                    <StyledBox className='ProfileData'>
                        <StyledTypography variant='h6'>{usuario.nombre}</StyledTypography>
                        <Box>
                            <Divider sx={{ borderBottom: '0.1px solid #2373a0', opacity: '0.3' }} />
                            <StyledTypography align='left' sx={{ fontSize: '20px', opacity: "0.7" }}>Fecha de Nacimiento:</StyledTypography>
                            <StyledTypography align='left' sx={{ fontSize: '18px' }}>{usuario.dateBirth}</StyledTypography>
                            <Divider sx={{ borderBottom: '0.1px solid #2373a0', opacity: '0.3' }} />
                            <StyledTypography align='left' sx={{ fontSize: '20px', fontStyle: 'italic' }}>Telefono:</StyledTypography>
                            <StyledTypography align='left' sx={{ fontSize: '18px' }}>{usuario.phone}</StyledTypography>
                            <Divider sx={{ borderBottom: '0.1px solid #2373a0', opacity: '0.3' }} />
                            <StyledTypography align='left' sx={{ fontSize: '20px', opacity: "0.7" }}>Correo</StyledTypography>
                            <StyledTypography align='left' sx={{ fontSize: '18px' }}>{usuario.email}</StyledTypography>
                            <Divider sx={{ borderBottom: '0.1px solid #2373a0', opacity: '0.3' }} />
                            {usuario.user_type == 'PACIENTE' && (
                                <>
                                    <StyledTypography align='left' sx={{ fontSize: '20px', opacity: "0.7" }}>Dirección</StyledTypography>
                                    <StyledTypography align='left' sx={{ fontSize: '18px' }}>{usuario.address}</StyledTypography>
                                </>
                            )}
                            <StyledButton onClick={toggleEditMode}>Editar Perfil</StyledButton>
                        </Box>
                    </StyledBox>
                </StyledBox>
            </StyledBox>
            <StyledBox className='MainSettingsBox'>
                <StyledTypography variant='h6' sx={{ opacity: "0.7", textAlign: "left" }}>Configuración</StyledTypography>
                <StyledTypography variant='h7' sx={{ opacity: "0.7", textAlign: "left" }}>Datos</StyledTypography>
                <StyledBox className='SettingsData' editMode={editMode}>
                    <Grid container sx={{ marginTop: '1vh' }}>
                        <StyledGrid item xs={6} md={6}>
                            <OTextField
                                topLabel="Nombre"
                                width="100%"
                                inputType="text"
                                name="first_name"
                                required
                                id="Nombre"
                                autoComplete="Nombre"
                                autoFocus
                                disabled={!editMode} // Aquí se deshabilita el campo si editMode es falso
                                defaultValue={usuario.first_name}
                                onChange={handleFormChange}
                            />
                        </StyledGrid>
                        <StyledGrid item xs={6} md={6}>
                            <OTextField
                                topLabel="Apellido"
                                width="100%"
                                inputType="text"
                                name="last_name"
                                required
                                id="Apellido"
                                autoComplete="Apellido"
                                autoFocus
                                disabled={!editMode} // Aquí se deshabilita el campo si editMode es falso
                                defaultValue={usuario.last_name}
                                onChange={handleFormChange}
                            />
                        </StyledGrid>
                        <StyledGrid item xs={6} md={6}>
                            <OTextField
                                // placeholder={usuario.phone}
                                topLabel="Telefono"
                                width="100%"
                                inputType="text"
                                name="phone"
                                required
                                id="Telefono"
                                autoComplete="Telefono"
                                autoFocus
                                disabled={!editMode} // Aquí se deshabilita el campo si editMode es falso
                                defaultValue={usuario.phone}
                                onChange={handleFormChange}
                            />
                        </StyledGrid>
                        {usuario.user_type === "PACIENTE" && (
                            <StyledGrid item xs={6} md={6}>
                                <OTextField
                                    // placeholder={usuario.address}
                                    topLabel="Direccion"
                                    width="100%"
                                    inputType="text"
                                    name="address"
                                    required
                                    autoFocus
                                    disabled={!editMode} // Aquí se deshabilita el campo si editMode es falso
                                    defaultValue={usuario.address}
                                    onChange={handleFormChange}
                                />
                            </StyledGrid>
                        )}
                        <StyledGrid item xs={6} md={6}>
                            <StyledButton disabled={!editMode} fullWidth onClick={applyChanges}>Aplicar Cambios</StyledButton>
                        </StyledGrid>
                    </Grid>
                </StyledBox>
                <Grid container display={'flex'} flexDirection={'row'}>
                    <StyledBox className='SettingsPassword'>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '20vw' }}>
                            <StyledTypography variant='h7' sx={{ opacity: "0.7", textAlign: "left" }}>Cambiar Contraseña</StyledTypography>
                            <OTextField
                                placeholder='Contraseña actual'
                                topLabel="Contraseña actual"
                                width="100%"
                                inputType="password"
                                name="currentPassword"
                                required
                                id="currentPassword"
                                autoComplete="currentPassword"
                                autoFocus
                            />
                            <OTextField
                                placeholder='Nueva Contraseña'
                                topLabel="Nueva Contraseña"
                                width="100%"
                                inputType="password"
                                name="newPassword"
                                required
                                id="newPassword"
                                autoComplete="newPassword"
                                autoFocus
                                onChange={handleNewPasswordChange}
                                error={!passwordMatch}
                                helperText={!passwordMatch && "Las contraseñas no coinciden"}
                            />
                            <OTextField
                                placeholder='Repetir Nueva Contraseña'
                                topLabel="Repetir Nueva Contraseña"
                                width="100%"
                                inputType="password"
                                name="confirmNewPassword"
                                required
                                id="confirmNewPassword"
                                autoComplete="confirmNewPassword"
                                autoFocus
                                onChange={handleConfirmNewPasswordChange}
                                error={!passwordMatch}
                                helperText={!passwordMatch && "Las contraseñas no coinciden"}
                            />
                            <StyledButton sx={{ width: '100%', height: '30px' }} disabled={!passwordMatch || !passwordFieldsNotEmpty}>Cambiar Contraseña</StyledButton>
                        </Box>
                    </StyledBox>
                    <Grid item xs sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        {usuario.user_type === "MEDICO" && (
                            <>
                                <OTextField
                                    multiline
                                    rows={4}
                                    fullWidth
                                    topLabel="Descripcion medica"
                                    // placeholder="Escribe una breve descripcion sobre tus labores medicas aquí"
                                    inputType="text"
                                    name="descripcion"
                                    value={usuario.descripcion}
                                    disabled={!editMode}
                                    defaultValue={usuario.descripcion}
                                    onChange={handleFormChange}
                                />
                                <StyledButton sx={{ height: '30px', mt: 5 }} onClick={handleSelectSchedule}>Agregar horarios</StyledButton>
                            </>
                        )}
                    </Grid>
                </Grid>
            </StyledBox>
        </ContainerContent>
    );
};

export default MyProfile;
