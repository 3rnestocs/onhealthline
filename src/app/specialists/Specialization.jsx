import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import OTextField from '../../components/OTextField';
import Specialists from './Specialists';
import DoctorProfile from '../profile/DoctorProfile';
import Schedule from '../Schedule/Schedule'
import Dermatologia from '../../assets/ICONDermatologia.png'
import Geriatria from '../../assets/ICONGeriatria.png'
import Pediatria from '../../assets/ICONPediatria.png'
import medGeneral from '../../assets/ICONMedGeneral.png'
import medInterna from '../../assets/ICONMedInterna.png'
import Psiquiatria from '../../assets/ICONPsiquiatria.png'

const StyledGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ContainerContent = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '120vh',
    height: '70vh',
    padding: '5vh',
    flexDirection: 'column',
});

const SyledButton = styled(Button)({
    backgroundColor: '#ffffff',
    color: '#2373a0',
    border: '4px solid #2373a0',
    borderRadius: '15px',
    minWidth: '400px',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column'
});

const StyledTypography = styled(Typography)({
    color: '#2373a0',
    padding: '5px',
    fontWeight: 'bold',
});

const Specialization = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [showSchedule, setShowSchedule] = useState(false);

    const handleSearch = (value) => {
        setSearchValue(value);
        setIsSearching(value !== '');
        setFilterValue(value);
    };

    const handleDoctorSelect = (doctorData) => {
        setSelectedDoctor(doctorData);
        setIsSearching(false);
        setShowSchedule(false);
    };

    const handleReturn = () => {
        setSelectedDoctor(null);
        setIsSearching(filterValue !== '');
        setShowSchedule(false);
    };

    const handleSchedule = () => {
        setShowSchedule(true); // Muestra Schedule al hacer clic en "Agendar tu Consulta"
    };

    return (
        <ContainerContent>
            {!showSchedule && (
                <Box>
                    <StyledGrid item xs={12} md={12}>
                        <OTextField
                            topLabel="Buscar Especialista"
                            width="100%"
                            inputType="search"
                            name="search"
                            required
                            id="search"
                            autoComplete="search"
                            autoFocus
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </StyledGrid>
                </Box>
            )}
            {(isSearching || selectedDoctor) ? null : (
                 <Grid container spacing={6} sx={{ marginTop: '3vh' }}>
                 <StyledGrid item xs={6} md={6}>
                     <SyledButton onClick={() => handleSearch('Dermatologia')}>
                         <StyledTypography>Dermatologia</StyledTypography>
                         <img
                             alt='Dermatologia'
                             src={Dermatologia }
                             width={50}
                             height={50}
                         />
                     </SyledButton>
                 </StyledGrid>
                 <StyledGrid item xs={6} md={6}>
                     <SyledButton onClick={() => handleSearch('Geriatria')}>
                         <StyledTypography>Geriatria</StyledTypography>
                         <img
                             alt='Geriatria'
                             src={Geriatria}
                             width={50}
                             height={50}
                         />
                     </SyledButton>
                 </StyledGrid>

                 <StyledGrid item xs={6} md={6}>
                     <SyledButton onClick={() => handleSearch('Medicina General')}>
                         <StyledTypography>Medicina General</StyledTypography>
                         <img
                             alt='Medicina General'
                             src={medGeneral}
                             width={50}
                             height={50}
                         />
                     </SyledButton>
                 </StyledGrid>

                 <StyledGrid item xs={6} md={6}>
                     <SyledButton onClick={() => handleSearch('Medicina Interna')}>
                         <StyledTypography>Medicina Interna</StyledTypography>
                         <img
                             alt='Medicina Interna'
                             src={medInterna}
                             width={50}
                             height={50}
                         />
                     </SyledButton>
                 </StyledGrid>

                 <StyledGrid item xs={6} md={6}>
                     <SyledButton onClick={() => handleSearch('Pediatria')}>
                         <StyledTypography>Pediatria</StyledTypography>
                         <img
                             alt='Pediatria'
                             src={Pediatria}
                             width={50}
                             height={50}
                         />
                     </SyledButton>
                 </StyledGrid>

                 <StyledGrid item xs={6} md={6}>
                     <SyledButton onClick={() => handleSearch('Psiquiatria')}>
                         <StyledTypography>Psiquiatria</StyledTypography>
                         <img
                             alt='Psiquiatria'
                             src={Psiquiatria}
                             width={50}
                             height={50}
                         />
                     </SyledButton>
                 </StyledGrid>


             </Grid>
            )}
            {isSearching && (
                <Specialists searchValue={searchValue} onDoctorSelect={handleDoctorSelect} />
            )}
            {selectedDoctor && !showSchedule && (
                <DoctorProfile doctorData={selectedDoctor} onReturn={handleReturn} onScheduleAppointment={handleSchedule} />
            )}
            {showSchedule && (
                <Schedule doctorData={selectedDoctor} onReturn={handleReturn} />
            )}
        </ContainerContent>
    );
};

export default Specialization;
