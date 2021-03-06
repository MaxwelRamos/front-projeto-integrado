import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Filtro from './Filtro';
import { CoinService } from "../../../api/CoinService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TodasMoedasListView = () => {
  const classes = useStyles();
  const [moedas, setMoedas] = useState([]);
  const [formSubmetido, setFormSubmetido] = useState(false);

  const aplicarFiltro = async (filtro) => {
    try {
      setFormSubmetido(true)
      await CoinService.getMoedas(filtro)
        .then(response => {
          const listaTodasMoedas = response.data.moedas
          setMoedas(listaTodasMoedas)
          setFormSubmetido(false)
        })
        .catch(e => {
          e.response.data.errors.forEach(
            error => alert(error))
        setFormSubmetido(false)
        })
    } catch (err) {
      setFormSubmetido(false)
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }

  return (
    <Page
      className={classes.root}
      title="Moedas"
    >
      <Container maxWidth={false}>
      <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          {formSubmetido ? <CircularProgress /> : ""}
        </Typography>        
        <Filtro aplicarFiltro={aplicarFiltro} />
        <Box mt={3}>
          <Results moedas={moedas} />
        </Box>
      </Container>
    </Page>
  );
};

export default TodasMoedasListView;
