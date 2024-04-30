import OButton from '@/components/OButton';
import OTextField from '@/components/OTextField';
import { Grid, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PacienteLogin() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

    const handleNavigate = () =>{
      navigate('/schedules')
    }
  
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
        <OButton
          title="Iniciar sesión"
          onClick={handleNavigate}
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
    );
  }

  export default PacienteLogin;