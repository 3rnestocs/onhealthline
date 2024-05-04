import OButton from '../../../components/OButton';
import OTextField from '../../../components/OTextField';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../api/authProvider';
// import { useDispatch } from 'react-redux';
// import { login } from '@/redux/user/userSlice';

function Login({ tipoUsuario }) {
  const navigate = useNavigate();
  const { loginAction } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Los campos son inválidos, por favor llénalos correctamente.');
      return;
    }
    console.log("request 1:", formData);
    // dispatch(login(formData))
    try {
      await loginAction(formData);
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Grid container width={'25vw'} direction={'column'} alignItems='center' marginTop={5} component={'form'} onSubmit={handleSubmit} noValidate>
      <OTextField
        topLabel="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        inputType="email"
        name="email"
        required
        autoFocus
        value={formData.email}
        onChange={handleChange}
      />
      <OTextField
        topLabel="Contraseña"
        placeholder="Ingresa tu contraseña"
        inputType="password"
        name="password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <OButton title="Iniciar sesión" sx={{ marginTop: '16px' }} />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {/* <Grid item xs>
        <Typography variant="body2">
          ¿Olvidaste tu contraseña? <Link to='/access' style={{ color: '#2376a1' }}>Recupérala aquí</Link>
        </Typography>
      </Grid> */}
    </Grid>
  );
}

export default Login;