import { SetStateAction, useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, AppBar, Container, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';


const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then((resposta: { data: SetStateAction<IPrato[]>; }) =>
        setPratos(resposta.data))
  }, [])

  const excluir = (pratoAhSerExcluido: IPrato) => {

    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(pratos => pratos.id !== pratoAhSerExcluido.id)
        setPratos([...listaPratos]);
      })
  }


  return (

    <TableContainer component={Paper}>
      <Box>
        <AppBar position='static' >
          <Container maxWidth="xl" >
            <Toolbar>
              <Typography style={{ marginRight: 90 }} variant="h6" >
                Administração dos Pratos

              </Typography>
              <Button href="http://localhost:3000/admin/restaurantes" variant="contained">
                Ir para a adminsitração de restaurantes
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
              Tag
            </TableCell>
            <TableCell>
              imagem
            </TableCell>
            <TableCell>
              Descrição
            </TableCell>
            <TableCell>
              restaurante
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
          {pratos.map(pratos =>
            <TableRow key={pratos.id}>
              <TableCell>
                {pratos.nome}
              </TableCell>
              <TableCell>
                {pratos.tag}
              </TableCell>
              <TableCell>
                <a href={pratos.imagem} target="_blank" rel="noreferrer"> ver imagem </a>
              </TableCell>
              <TableCell>
                {pratos.descricao}
              </TableCell>
              <TableCell>
                {pratos.restaurante}
              </TableCell>

              <TableCell>
                [<Link to={`/admin/pratos/${pratos.id}`} >Editar</Link>]
              </TableCell>
              <TableCell>
                [<button onClick={() =>
                  excluir(pratos)
                }> Remover
                </button>]
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
      <Link to={'http://localhost:3000/admin/pratos/novo'} >Adicionar</Link>


    </TableContainer>


  );
}

export default AdministracaoPratos;