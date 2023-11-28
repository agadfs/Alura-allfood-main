import { SetStateAction, useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then((resposta: { data: SetStateAction<IRestaurante[]>; }) => setRestaurantes(resposta.data))
  }, [])

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {

    http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
        setRestaurantes([...listaRestaurante]);
      })
  }


  return (

    <TableContainer component={Paper}>
            <Box>
        <AppBar position='static' >
          <Container maxWidth="xl" >
            <Toolbar>
              <Typography style={{ marginRight: 90 }} variant="h6" >
                Administração dos Restaurantes

              </Typography>
              <Button  href="http://localhost:3000/admin/pratos" variant="contained">
                Ir para a adminsitração de pratos
              </Button>

            </Toolbar>

          </Container>

        </AppBar>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Remover
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante =>
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [<Link to={`/admin/restaurantes/${restaurante.id}`} >Editar</Link>]
              </TableCell>
              <TableCell>
                [<button onClick={() =>
                  excluir(restaurante)
                }> Remover
                </button>]
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
      <Link to={'http://localhost:3000/admin/restaurantes/novo'} >Adicionar</Link>
    </TableContainer>


  );
}

export default AdministracaoRestaurantes;