import React, { useState } from 'react';
import { TableBody, TableCell, TableContainer, TableHead, Paper, Button, Table, TableRow, Box, TablePagination } from '@mui/material';
import { styled } from '@mui/system';

const ContainerContent = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '120vh',
    height: '70vh',
    padding: '10vh',
    marginTop: '2vh',
    marginLeft: '10vh',
    flexDirection: 'column'
});

const StyledButton = styled(Button)({
    backgroundColor: '#2373a0',
    color: '#ffffff',
    borderRadius: '30px',
    margin: '5px'
});

const PaginationContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em' 
});

const MySchedule = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const apiData = [
        {
            doctor: 'Meredith Gray',
            especialidad: 'Medicina General',
            estado: 'Agendado',
            fecha: '21/03/2024',
        },
        {
            doctor: 'John Bailey',
            especialidad: 'Psiquiatría',
            estado: 'Agendado',
            fecha: '24/03/2024',
        },
        {
            doctor: 'Jose Rodriguez',
            especialidad: 'Medicina Interna',
            estado: 'Agendado',
            fecha: '25/03/2024',
        },
    ];

    return (
        <ContainerContent>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Doctor</TableCell>
                            <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Especialidad</TableCell>
                            <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Estado</TableCell>
                            <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Fecha</TableCell>
                            <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'center' }} component="th" scope="row">
                                    {row.doctor}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{row.especialidad}</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: '#1F9254' }}>{row.estado}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{row.fecha}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <StyledButton variant="contained" sx>
                                        Unirse a consulta
                                    </StyledButton>
                                    <StyledButton variant="contained" sx>
                                        Cancelar
                                    </StyledButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={apiData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </PaginationContainer>
        </ContainerContent>
    );
};

export default MySchedule;
