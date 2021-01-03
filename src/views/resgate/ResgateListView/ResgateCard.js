import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ResgateCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  const resgatePremio = () => {
      alert('Ops! Em breve resgatar prêmios estará disponível :) ')
  }


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
           <Avatar
            alt="Product"
            src={product.media}
            variant="square"
          /> 
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="center"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Button onClick={resgatePremio}
              color="primary"
              variant="contained"
            >
              Resgatar 
            </Button>
            
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ResgateCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ResgateCard;