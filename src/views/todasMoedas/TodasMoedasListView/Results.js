import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = props => {

  const { className, moedas, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                  Email Origem
                </TableCell>
                <TableCell>
                  Email Destino
                </TableCell>
                <TableCell>
                  Quantidade
                </TableCell>
                <TableCell>
                  data
                </TableCell>
                <TableCell>
                  Motivo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moedas.map((moeda) => (
                <TableRow>
                  <TableCell>
                    {moeda.email}
                  </TableCell>
                  <TableCell>
                    {moeda.emailDestino}
                  </TableCell>
                  <TableCell>
                    {moeda.quantidadeMoeda}
                  </TableCell>
                  <TableCell>
                    {moment(moeda.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moeda.motivo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
