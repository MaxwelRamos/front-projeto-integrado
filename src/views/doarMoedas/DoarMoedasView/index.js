import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DoarMoedasDetails from './DoarMoedasDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DoarMoedas = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
    >
      <Container maxWidth={false}>
        <DoarMoedasDetails />
      </Container>
    </Page>
  );
};

export default DoarMoedas;
