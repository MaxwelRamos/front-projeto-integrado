import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { CoinService } from "../../../api/CoinService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const ParaDoar = props => {
  const { className, ...rest } = props;

  const navigate = useNavigate();
  const [formSubmetido, setFormSubmetido] = useState(false);
  const [quantidadeMensal, setQuantidadeMensal] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const classes = useStyles();

  const resgateMensal = () => {
    const r = window.confirm("Confirma o resgate mensal para o mês atual ?")
    if (r === true)
      setSaldoMensal();
  }

  const setSaldoMensal = async () => {
    try {
      setFormSubmetido(true)
      await CoinService.setSaldoMensal()
        .then(response => {
          setMensagem("Saldo mensal obtido com sucesso!")
          setOpenDialog(true)
          setQuantidadeMensal(response.data.quantidadeMensal)
          navigate('/app/dashboard', { replace: true });
        })
        .catch(e => {
          e.response.data.errors.forEach(error => {
            setMensagem(error)
            setOpenDialog(true)
          })
          setFormSubmetido(false)
        })
    } catch (err) {
      setFormSubmetido(false)
      setMensagem('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
      setOpenDialog(true)
    }
    setFormSubmetido(false)
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              PARA DOAR
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {quantidadeMensal > 0 ? quantidadeMensal : props.quantidadeMensal}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowRightIcon className={classes.differenceIcon} />
          <Button onClick={resgateMensal}  disabled={formSubmetido}
            color="primary"
            size="small"
            variant="text"
          >
            Obter saldo mensal
        </Button>
        </Box>
      </CardContent>

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

    </Card>
  );
};

ParaDoar.propTypes = {
  className: PropTypes.string
};

export default ParaDoar;
