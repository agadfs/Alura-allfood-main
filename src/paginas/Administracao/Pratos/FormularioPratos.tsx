import { AppBar, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';
import IPrato from '../../../interfaces/IPrato';

const FormularioPratos = () => {

  const parametros = useParams();
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const [restaurante, setRestaurante] = useState('');


  const [imagem, setImagem] = useState<File | null>(null)
  const [idRestaurante, setIdRestaurante] = useState<number | null>(null);

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
    if (parametros.id) {


      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setIdRestaurante(resposta.data.restaurante))

      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setNomePrato(resposta.data.nome))
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setDescricao(resposta.data.descricao))
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setTag(resposta.data.tag))





    }
  }, [parametros.id])

  useEffect(() => {
    if (idRestaurante) {
      const restauranteEncontrado = restaurantes.find(restaurante => restaurante.id === idRestaurante);

      if (restauranteEncontrado) {
        setRestaurante(restauranteEncontrado.nome);
      }

      console.log("OPA");
    }
  }, [idRestaurante, restaurantes]);

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))


  }, [])


  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    }
    else {
      setImagem(null)
    }


  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('restaurante', restaurante)
    if (imagem) {
      formData.append('imagem', imagem)
    }

    formData.append('descricao', descricao)
    formData.append('tag', tag)


    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => alert('Prato cadastrado com sucesso'))
      .catch(erro => console.log(erro))


  }

  return (
    <>
      <AppBar position='static' >
        <Container maxWidth="xl" >
          <Toolbar>
            <Typography variant="h6" >
              Administração dos Pratos

            </Typography>
            <Button href="http://localhost:3000/admin/restaurantes" variant="contained">
              Ir para a adminsitração de restaurantes
            </Button>

          </Toolbar>

        </Container>

      </AppBar>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Typography component="h1" variant="h6" > Formulário de Pratos</Typography>
        <Typography component="h1" variant="h6" > Prato com id: {window.location.pathname.split("/").pop()} do restaurante de id: {idRestaurante} </Typography>

        <Box component='form' onSubmit={aoSubmeterForm}>
          <TextField
            value={nomePrato}
            onChange={evento => setNomePrato(evento.target.value)}
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select
              labelId="select-restaurante"
              value={idRestaurante || ''}  // Use idRestaurante as the value
              onChange={(event) => setIdRestaurante(event.target.value as number)}
            >
              {restaurantes.map((restaurante) => (
                <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo} />

          <TextField
            value={descricao}
            onChange={evento => setDescricao(evento.target.value)}
            label="Descrição do prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />




          <FormControl margin="dense" fullWidth >
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)} >
              {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>)}
            </Select>
          </FormControl>
          <Button
            sx={{ marginTop: 1 }}
            type="submit"
            fullWidth
            variant="outlined">
            Salvar
          </Button>
        </Box>
        <Link to={'http://localhost:3000/admin/pratos'} >Voltar a lista de Pratos</Link>
      </Box>
    </>
  )

}


export default FormularioPratos;