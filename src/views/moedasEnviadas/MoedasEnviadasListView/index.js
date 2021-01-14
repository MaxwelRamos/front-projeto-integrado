import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  CircularProgress
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

const MoedasEnviadasListView = () => {
  const classes = useStyles();
  const [moedasEnviadas, setMoedasEnviadas] = useState([]);
  const [formSubmetido, setFormSubmetido] = useState(false);

  useEffect(() => {
    getMoedasEnviadas()
  }, []);

  const getMoedasEnviadas = async () => {
    try {
      setFormSubmetido(true)
      await CoinService.getMoedasEnviadas()
        .then(response => {
          const listaMoedasEnviadas = response.data.moedasEnviadas
          setMoedasEnviadas(listaMoedasEnviadas)
          setFormSubmetido(false)
        })
        .catch(e => {
          e.response.data.errors.forEach(
            error => alert(error)) 
          setFormSubmetido(false)
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
      setFormSubmetido(false)
    }
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
      <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          {formSubmetido ? <CircularProgress /> : ""}
        </Typography>        
        <Box mt={3}>
          <Results moedasEnviadas={moedasEnviadas} />
        </Box>
      </Container>
    </Page>
  );
};

export default MoedasEnviadasListView;
