import React, { useState, useEffect }   from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalRecebidas from './TotalRecebidas';
import ParaDoar from './ParaDoar';
import { CoinService } from "../../../api/CoinService";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  useEffect(() => {
    getSaldo()
}, []);  

  const [quantidadeTotal, setQuantidadeTotal] = useState(0);
  const [quantidadeMensal, setQuantidadeMensal] = useState(0);

  const getSaldo = async () => {
    try {
      await CoinService.getSaldo()
        .then(response => {
          setQuantidadeTotal(response.data.quantidadeTotal)
          setQuantidadeMensal(response.data.quantidadeMensal)
        })
        .catch(e => {
          setQuantidadeTotal(0)
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }
 

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalRecebidas quantidadeTotal={quantidadeTotal} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <ParaDoar quantidadeMensal={quantidadeMensal}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
