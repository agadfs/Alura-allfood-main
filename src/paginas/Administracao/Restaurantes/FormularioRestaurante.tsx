import { AppBar, Box, Button, Container, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

const FormularioRestaurante = () => {

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('');


  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()


    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante,
      })
        .then(() => {
          alert("Restaurante atualizado com sucesso!")
        })

    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante,
      })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!")
        })

    }

  }
  return (
    <>
      <AppBar position='static' >
        <Container maxWidth="xl" >
          <Toolbar>

            <Box  >
            <Typography variant="h6" >
              Administração dos restaurantes

            </Typography>
              <Button
              href="http://localhost:3000/admin/pratos" 
              variant="outlined">
                Ir para a adminsitração de pratos
              </Button>
            </Box>

          </Toolbar>

        </Container>

      </AppBar>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Typography component="h1" variant="h6" > Formulário de Restaurantes</Typography>
        <Typography component="h1" variant="h6" > Restaurante com id {window.location.pathname.split("/").pop()} </Typography>


        <Box component='form' onSubmit={aoSubmeterForm}>
          <TextField
            value={nomeRestaurante}
            onChange={evento => setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante"
            variant="standard"
            fullWidth
            required
          />

          <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">
            Adicionar Restaurante
          </Button>
        </Box>
        <Link to={'http://localhost:3000/admin/restaurantes'} >Voltar a lista de Restaurantes</Link>
      </Box>
    </>
  )

}


export default FormularioRestaurante;