import React from 'react';
import { Container, Typography, Box, Divider, Grid } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContainerContent = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '95vh',
});

const ImageBackground = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity:'0.5'
});

const OverlayText = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
  color: '#2373a0',
  zIndex: 1,
  fontSize: '100px',
});

const BottomBox = styled(Box)({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  height: '30%',
});

const StyledBox =styled(Box)({
    display:'flex',
    flexDirection:'column'
})

export default function Footer() {
  return (
    <Box sx={{ flex: '1', textAlign: 'center', padding: '0', flexDirection: 'column' }}>
      <ContainerContent>
        <ImageBackground src="../../../public/assets/footer.png" alt="Background Image" />
        <BottomBox>
          <Divider sx={{ borderBottom: '1px solid #ccc' }} />
          <Grid container spacing={0}>
            <Grid item xs={4}>
                <Typography variant="h3">Contactanos</Typography>
              <StyledBox>
                <a href="mailto:info@OnHealthLine.com.ve" style={{ textDecoration: 'none',color:'#ffffff' }}>
                  <Typography variant="h3"><EmailIcon style={{ fontSize: '5vh' }} /></Typography>
                </a>
                <Typography variant="h3"><PhoneIcon style={{ fontSize: '5vh' }} /></Typography>
              </StyledBox>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h3">Redes Sociales</Typography>
              <StyledBox>
                <a href="https://www.instagram.com/onhealthline9/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color:'#ffffff' }}>
                  <Typography variant="h3"><InstagramIcon style={{ fontSize: '5vh' }} /></Typography>
                </a>
                <Typography variant="h3"><FacebookIcon style={{ fontSize: '5vh' }} /></Typography>
                <Typography variant="h3"><XIcon style={{ fontSize: '5vh' }} /></Typography>
              </StyledBox>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h3">Excelente</Typography>
              <StyledBox>
                <Typography variant="h3"><StarIcon style={{ fontSize: '5vh' }} /><StarIcon style={{ fontSize: '5vh' }} /><StarIcon style={{ fontSize: '5vh' }} /><StarIcon style={{ fontSize: '5vh' }} /><StarIcon style={{ fontSize: '5vh' }} /></Typography>
              </StyledBox>
            </Grid> 
          </Grid>
          <Typography variant='h3' sx={{ marginTop: '3vh' }}>Copyright © OnHealthLine </Typography>
        </BottomBox>
      </ContainerContent>
    </Box>
  );
}
