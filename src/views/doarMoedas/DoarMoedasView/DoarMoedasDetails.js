import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  MenuItem,

  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle

} from '@material-ui/core';

import { CoinService } from "../../../api/CoinService";
import { LoginService } from "../../../api/LoginService";

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const DoarMoedasDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const [emailDestino, setEmailDestino] = useState('');
  const [quantidadeMoeda, setQuantidadeMoeda] = useState('');
  const [motivo, setMotivo] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [users, setUsers] = useState([]);


  const [formSubmetido, setFormSubmetido] = useState(false);

  const [currency, setCurrency] = React.useState('');
  const navigate = useNavigate();


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async () => {
    try {
      await LoginService.getUsers()
        .then(response => {
          const listaUsers = response.data.users.filter((f) => {
            return f.email !== JSON.parse(localStorage.getItem('_meritMoney_user')).email;
          })
          setUsers(listaUsers)
        })
        .catch(e => {
          e.response.data.errors.forEach(
            error => alert(error))
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }


  const sendCoins = async () => {
    try {
      setFormSubmetido(true)
      await CoinService.sendCoins({ emailDestino, quantidadeMoeda, motivo })
        .then(response => {
          setMensagem('Operação efetuada com sucesso!')
          setOpenDialog(true)
          setEmailDestino('')
          setQuantidadeMoeda('')
          setMotivo('')

          navigate('/app/doarMoedas', { replace: true });
        })
        .catch(e => {
          e.response.data.errors.forEach(error => {
            setMensagem(error)
            setOpenDialog(true)
          })
        })
    } catch (err) {
      setMensagem('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
      setOpenDialog(true)
    }
    setFormSubmetido(false)
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                id="firstName"
                name="firstName"
                label="Procure por um usuário"
                value={emailDestino}
                onChange={e => setEmailDestino(e.target.value)}
                fullWidth
                autoComplete="given-name"
              >
                {users.map((user) => (
                  <MenuItem key={user.email} value={user.email} >
                    {user.email}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Quantidade de Moedas"
                value={quantidadeMoeda}
                type="number"
                fullWidth
                autoComplete="family-name"
                onChange={e => setQuantidadeMoeda(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Motivo"
                value={motivo}
                fullWidth
                autoComplete="family-name"
                onChange={e => setMotivo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" color="primary" disabled={formSubmetido} onClick={sendCoins}>
                ENVIAR MOEDAS
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={openDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" onClose={e => setOpenDialog(false)}>
        <DialogTitle id="alert-dialog-title">{"ATENÇÃO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mensagem}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={e => setOpenDialog(false)}>FECHAR</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DoarMoedasDetails.propTypes = {
  className: PropTypes.string
};

export default DoarMoedasDetails;
