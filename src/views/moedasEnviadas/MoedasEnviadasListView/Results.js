import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = props => {

  const { className, moedasEnviadas, ...rest } = props;

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
              {moedasEnviadas.map((customer) => (
                <TableRow>
                  <TableCell>
                    {customer.emailDestino}
                  </TableCell>
                  <TableCell>
                    {customer.quantidadeMoeda}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {customer.motivo}
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
  moedasEnviadas: PropTypes.array.isRequired
};

export default Results;
