import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import { CoinService } from "../../../api/CoinService";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const DisponivelResgate = ({ className, ...rest }) => {
  const classes = useStyles();

  useEffect(() => {
    getSaldo()
  }, []);

  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  const getSaldo = async () => {
    try {
      await CoinService.getSaldo()
        .then(response => {
          setQuantidadeTotal(response.data.quantidadeTotal)
        })
        .catch(e => {
          setQuantidadeTotal(0)
        })
    } catch (err) {
      alert('Nao foi possivel efetuar conexao com o servidor. Tente mais tarde.')
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
            <h2>{`Disponível para resgate: ${quantidadeTotal}`}</h2> 
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

DisponivelResgate.propTypes = {
  className: PropTypes.string
};

export default DisponivelResgate;
