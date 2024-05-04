import React from 'react';
import Button from '@mui/material/Button';

const OButton = ({
  title,
  color = 'white',
  bg = '#10587e',
  onClick,
  fullWidth = false,
  icon
}) => {

  return (
    <Button
      type="submit"
      size="large"
      variant="contained"
      sx={{ bgcolor: bg, color: color, width: fullWidth ? '100%' : 'auto' }}
      onClick={onClick}
      startIcon={icon}
    >
      {title}
    </Button>
  );
};

export default OButton;