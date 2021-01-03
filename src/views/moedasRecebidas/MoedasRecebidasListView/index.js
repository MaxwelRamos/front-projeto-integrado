import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import { CoinService } from "../../../api/CoinService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MoedasRecebidasListView = () => {
  const classes = useStyles();
  const [moedasRecebidas, setMoedasRecebidas] = useState([]);

  useEffect(() => {
    getMoedasRecebidas()
  }, []);

  const getMoedasRecebidas = async () => {
    try {
      await CoinService.getMoedasRecebidas()
        .then(response => {
          const listaMoedasRecebidas = response.data.moedasRecebidas
          setMoedasRecebidas(listaMoedasRecebidas)
        })
        .catch(e => {
          e.response.data.errors.forEach(
            error => alert(error)) 
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results moedasRecebidas={moedasRecebidas} />
        </Box>
      </Container>
    </Page>
  );
};

export default MoedasRecebidasListView;
