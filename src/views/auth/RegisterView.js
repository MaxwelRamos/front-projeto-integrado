import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LoginService } from "../../api/LoginService";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [formSubmetido, setFormSubmetido] = useState(false);
  const userKey = '_meritMoney_user';

  const signup = async () => {
    try {
      await LoginService.signup({ name, email, password, confirmPassword })
        .then(response => {
          localStorage.setItem(userKey, JSON.stringify(response.data))
          navigate('/app/dashboard', { replace: true });
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
      title="Register"
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
              email: email?email : '',
              name: name?name : '',
              confirmPassword: confirmPassword?confirmPassword : '',
              password: password?password : '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
                name: Yup.string().max(255).required('Nome é obrigatório'),
                confirmPassword: Yup.string().max(255).required('Confirmação da Senha é obrigatória'),
                password: Yup.string().max(255).required('Senha é obrigatória')
                //mm policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={() => {
              setFormSubmetido(true)
              signup();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Merit Money
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Seja bem vindo!
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nome"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={e => setName(e.target.value)}
                  value={values.name}
                  variant="outlined"
                />
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
                  value={values.email}
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
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirmar Senha"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  value={values.confirmPassword}
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
                    Registrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Já é cadastrado?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Entrar aqui!
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;