import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';

const OTextField = ({
    backgroundColor = '#f2f2f2',
    placeholder,
    focusedColor = '#2376a1',
    topLabel,
    width,
    type,
    icon,
    inputType,
    ...otherProps
  }) => {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    let startAdornment;
    switch (inputType) {
      case 'email':
        startAdornment = (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        );
        break;
      case 'username':
        startAdornment = (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        );
        break;
      case 'password':
        startAdornment = (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        );
        break;
      case 'text':
        startAdornment = (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        );
        break;
      case 'search':
        startAdornment = (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
          );
        break 
      default:
        startAdornment = null;
    }
  
    let endAdornment;
    if (inputType === 'password') {
      endAdornment = (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }
  
    return (
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        type={type}
        placeholder={placeholder}
        InputProps={{
          startAdornment,
          endAdornment,
        }}
        label={topLabel}
        {...otherProps}
        sx={{
          backgroundColor,
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: focusedColor,
          },
          '& .MuiInputLabel-outlined.Mui-focused': {
            color: focusedColor,
          },
          width,
        }}
      />
    );
  };

export default OTextField;
