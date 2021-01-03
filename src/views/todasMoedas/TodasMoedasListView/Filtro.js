import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { LoginService } from "../../../api/LoginService";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Filtro = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [usersEmissor, setUsersEmissor] = useState([]);
  const [emailEmissor, setEmailEmissor] = useState('');
  const [usersDestino, setUsersDestino] = useState([]);
  const [emailDestino, setEmailDestino] = useState('');
  const [dataDoacao, setDataDoacao] = useState(null);

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async () => {
    try {
      await LoginService.getUsers()
        .then(response => {
          const listaUsers = response.data.users
          setUsersEmissor(listaUsers)
          setUsersDestino(listaUsers)
        })
        .catch(e => {
          e.response.data.errors.forEach(
            error => alert(error))
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }

  const aplicarFiltro = () => {
    const filtro = {
      dataDoacao: dataDoacao,
      emailEmissor: emailEmissor,
      emailDestino: emailDestino
    }
    props.aplicarFiltro(filtro)
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data doação"
                  fullWidth={true}
                  type="date"
                  value={dataDoacao}
                  onChange={e => setDataDoacao(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  id="firstName"
                  name="firstName"
                  label="Emissor"
                  value={emailEmissor}
                  onChange={e => setEmailEmissor(e.target.value)}
                  fullWidth={true}
                  autoComplete="given-name"
                >
                  <MenuItem value="">
                    <em>Selecione ...</em>
                  </MenuItem>
                  {usersEmissor.map((user) => (
                    <MenuItem key={user.email} value={user.email} >
                      {user.email}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  id="firstName"
                  name="firstName"
                  label="Destino"
                  value={emailDestino}
                  onChange={e => setEmailDestino(e.target.value)}
                  fullWidth
                  autoComplete="given-name"
                >
                  <MenuItem value="">
                    <em>Selecione ...</em>
                  </MenuItem>
                  {usersDestino.map((user) => (
                    <MenuItem key={user.email} value={user.email} >
                      {user.email}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={aplicarFiltro}
                  variant="contained"
                  color="secondary"
                >Aplicar Filtro
              </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Filtro.propTypes = {
  className: PropTypes.string
};

export default Filtro;
