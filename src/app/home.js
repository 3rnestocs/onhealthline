import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10vh'}}>
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
        </div>
    );
}