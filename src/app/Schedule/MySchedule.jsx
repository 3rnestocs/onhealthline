import React, { useState, useEffect } from 'react';
import { TableBody, TableCell, TableContainer, TableHead, Paper, Button, Table, TableRow, Box, TablePagination } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../../api/authProvider';
import {getUser} from '../../utils/localStorageHelper'
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
  const { listEvents} = useAuth(); // Accediendo a la función listEvents y getUserType desde el contexto de autenticación
  const [citas, setCitas] = useState([]);
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const citasData = await listEvents(); // Llamando a la función listEvents para obtener los eventos
        setCitas(citasData);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchData();
  }, []);

  const usuario = getUser();
  // Obtener el tipo de usuario

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  return (
    <ContainerContent>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>{usuario.user_type === 'MEDICO' ? 'Paciente' : 'Doctor'}</TableCell>
              <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Especialidad</TableCell>
              <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Estado</TableCell>
              <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Fecha</TableCell>
              <TableCell sx={{ backgroundColor: '#2373a0', color: '#ffffff', textAlign: 'center' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: 'center' }} component="th" scope="row">
                  {usuario.user_type === 'MEDICO' ? row.nombre : row.nombre}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.especialidad}</TableCell>
                <TableCell sx={{ textAlign: 'center', color: '#1F9254' }}>{row.estado}Agendado</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{row.start_at}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  
                  <StyledButton variant="contained" sx onClick={() => window.open(row.google_meet_link, '_blank')}>
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
          count={citas.length}
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
