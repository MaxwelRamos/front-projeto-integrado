import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate  } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  DollarSign as DollarSignIcon,
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  List as ListIcon
} from 'react-feather';
import NavItem from './NavItem';
import { ValidadeTokenService } from 'src/api/ValidadeTokenService';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/doarMoedas',
    icon: DollarSignIcon,
    title: 'Doar Moedas'
  },
  {
    href: '/app/moedasEnviadas',
    icon: ListIcon,
    title: 'Minhas Doações'
  },
  {
    href: '/app/moedasRecebidas',
    icon: ListIcon,
    title: 'Doações Recebidas'
  },
  {
    href: '/app/moedas',
    icon: ListIcon,
    title: 'Todas Doações'
  },
  {
    href: '/app/resgate',
    icon: ShoppingBagIcon,
    title: 'Resgatar Recompensas'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {

  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();

  const userLogado = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));

  const user = {
    // avatar: '/static/images/avatars/avatar_6.png',
    avatar: '',
    jobTitle: userLogado ? userLogado.email : '',
    name: userLogado ? userLogado.name : ''
  };

  useEffect(() => {
    validaToken()
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const validaToken = async () => {
    try {
      if (!userLogado)
        navigate('/login', { replace: true });
      else
        await ValidadeTokenService.ValidadeToken({ token: userLogado.token })
          .then(response => {
            if (!response.data.valid) {
              localStorage.removeItem(process.env.REACT_APP_USERKEY)
              navigate('/login', { replace: true });
            }
          })
          .catch(e => {
            localStorage.removeItem(process.env.REACT_APP_USERKEY)
          })
    } catch (err) {
      localStorage.removeItem(process.env.REACT_APP_USERKEY)
    }
  }

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/login"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;