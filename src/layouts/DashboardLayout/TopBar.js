import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { CoinService } from "../../api/CoinService";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const userKey = '_meritMoney_user';
  const navigate = useNavigate();

  const userLogado = JSON.parse(localStorage.getItem(userKey));

  const [quantidadeMensal, setQuantidadeMensal] = useState(0);

  const getSaldo = async () => {
    try {
      await CoinService.getSaldo()
        .then(response => {
          setQuantidadeMensal(response.data.quantidadeMensal)
        })
        .catch(e => {
          setQuantidadeMensal(0)
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }
  getSaldo();

  const logout = () => {
    localStorage.removeItem(userKey)
    navigate('/login', { replace: true });
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <IconButton color="inherit" onClick={logout}>
            <InputIcon />
        </IconButton>
        <Box flexGrow={1} />
        <h4>{`Para doar: ${quantidadeMensal} - ${(userLogado ? userLogado.email : '')}`}</h4>
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
            </Badge>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
            >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
