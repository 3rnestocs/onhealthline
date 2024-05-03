import React from 'react';
import Button from '@mui/material/Button';

const OButton = ({
  title,
  color = 'white',
  bg = '#10587e',
  onClick,
  fullWidth = false,
  icon = null
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      type="submit"
      size="large"
      variant="contained"
      sx={{ mt: 2, mb: 2, bgcolor: bg, color: color, width: fullWidth ? '100%' : 'auto' }}
      onClick={handleClick}
      startIcon={icon}
    >
      {title}
    </Button>
  );
};

export default OButton;