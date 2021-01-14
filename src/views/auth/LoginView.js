import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import Page from 'src/components/Page';
import { LoginService } from "../../api/LoginService";
import { ValidadeTokenService } from 'src/api/ValidadeTokenService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const [formSubmetido, setFormSubmetido] = useState(false);

  useEffect(() => {
    validaToken()
  }, []);

  const validaToken = async () => {
    try {
      const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY))
      await ValidadeTokenService.ValidadeToken({ token: user.token })
        .then(response => {
          if (response.data.valid)
            navigate('/app/dashboard', { replace: true });
          else
            localStorage.removeItem(process.env.REACT_APP_USERKEY)
        })
        .catch(e => {
          localStorage.removeItem(process.env.REACT_APP_USERKEY)
        })
    } catch (err) {
      localStorage.removeItem(process.env.REACT_APP_USERKEY)
    }
  }

  const login = async () => {
    try {
      setFormSubmetido(true)
      await LoginService.login({ email, password: password })
        .then(response => {
          localStorage.setItem(process.env.REACT_APP_USERKEY, JSON.stringify(response.data))
          navigate('/app/dashboard', { replace: true });
        })
        .catch(e => {
          setFormSubmetido(false)
          e.response.data.errors.forEach(error => {
            setMensagem(error) 
            setOpenDialog(true)
          }) //ex: Usuario/Senha Invalido
        })
    } catch (err) {
      setFormSubmetido(false)
      setMensagem('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
      setOpenDialog(true)
    }
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: email ? email : '',
              password: password ? password : '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
              password: Yup.string().max(255).required('Senha é obrigatória')
            })}
            onSubmit={() => {
              login();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Merit Money
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Seja bem vindo!
                  </Typography>
                  
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    {formSubmetido ? <CircularProgress/> : ""}
                  </Typography>
 
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={formSubmetido}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Novo usuário?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Registrar aqui
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>

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
      </Box>
    </Page>
  );
};

export default LoginView;