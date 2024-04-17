import * as React from 'react';
import OButton from '@/components/OButton';
import OTextField from '@/components/OTextField';
import { AppBar, Avatar, Box, Button, Grid, IconButton, Link, Toolbar, Typography, styled } from '@mui/material';
import { LockOutlined as LockOutlinedIcon, Menu as MenuIcon } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © OnHealthLine '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const MainBox = styled(Box)({
  border: '2px solid black',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: 'white',
  margin: 'auto'
});

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>

    <Box
      backgroundColor={'#e6f9f6'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      width={'100vw'}
      height={'93vh'}
      overflow={'hidden'}
    >
      <MainBox>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
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
          <OButton
            title="Iniciar sesión"
          />
          <Grid container direction={'column'} alignItems='center' spacing={1} marginTop={1}>
            <Grid item xs>
              <Typography variant="body2">
                ¿Olvidaste tu contraseña? <Link href="#" color="#2376a1">Recupérala aquí</Link>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body2">
                ¿No tienes una cuenta? <Link href="#" color="#2376a1">Regístrate aquí</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Copyright sx={{ mt: 8 }} />
      </MainBox>
    </Box>
      </>
  );
}