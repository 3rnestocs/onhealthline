import React from 'react';
import {Box } from '@mui/material'
import LandingOne from './LadingOne'
import LandingAbout from './LandingAbout'
import OurDoctors from './OurDoctors'
import Services from './Services'
import Footer from './Footer'

export default function Home() {
  return (
    <Box sx={{flex: '1', textAlign: 'center',padding:'0', flexDirection:'column' }} >
      <LandingOne /> 
      <LandingAbout />
      <OurDoctors />
      <Services />
      <Footer />
    </Box>
  );
}
