import OButton from '@/components/OButton';
import OTextField from '@/components/OTextField';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ tipoUsuario }) {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate('/schedules')
  };

  return (
    <Grid container width={'25vw'} direction={'column'} alignItems='center' marginTop={1} component={'form'} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <OTextField
        placeholder="Ingresa tu nombre de usuario"
        focusedColor="#2376a1"
        topLabel="Nombre de usuario"
        width="100%"
        inputType="username"
        name="username"
        required
        id="username"
        autoComplete="username"
        autoFocus
      />
      <OTextField
        placeholder="Ingresa tu contraseña"
        focusedColor="#2376a1"
        topLabel="Contraseña"
        width="100%"
        inputType="password"
        name="password"
        required
        id="password"
        autoComplete="current-password"
      />
      <OButton title="Iniciar sesión" />
      <Grid container direction={'column'} alignItems='center' spacing={1} marginTop={1}>
        <Grid item xs>
          <Typography variant="body2">
            ¿Olvidaste tu contraseña? <Link to='/access' style={{ color: '#2376a1' }}>Recupérala aquí</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;