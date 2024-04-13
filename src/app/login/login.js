import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import OButton from '@/components/OButton';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import OTextField from '/src/components/OTextField';

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

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <Box
      backgroundColor={'#e6f9f6'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100vw'}
      height={'100vh'}
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

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </MainBox>
    </Box>
  );
}