import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import OAppBar from '@/components/OAppBar';
export default function Home({ onMenuClick, onLoginClick, showLoginButton }) {
    return (
        <>
        <OAppBar 
        onMenuClick={onMenuClick} 
        onLoginClick={onLoginClick} 
        showLoginButton={showLoginButton}
        />
        
        <Box
            backgroundColor={'#e6f9f6'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            width={'100vw'}
            height={'93vh'}
            overflow={'hidden'}
        >
            <Container>
                <Typography variant="h4" gutterBottom>
                    Body
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                    ullamcorper nunc. Nulla facilisi. Mauris auctor, nunc vitae
                    consectetur tincidunt, nisl urna tincidunt nunc, id lacinia nunc
                    justo et nunc. Sed vitae nunc auctor, aliquet nunc id, tincidunt
                    nunc. Sed nec ullamcorper nunc. Nulla facilisi. Mauris auctor, nunc
                    vitae consectetur tincidunt, nisl urna tincidunt nunc, id lacinia
                    nunc justo et nunc.
                </Typography>
            </Container>
        </Box>
        </>
    );
}