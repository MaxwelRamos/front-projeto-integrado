import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Title } from './Title';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export const Moedas = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    // <Paper className={fixedHeightPaper}>
    //   <React.Fragment>
    //     <Title>Moedas para doar</Title>
    //     <Typography component="p" variant="h4">
    //       $100.00
    //   </Typography>
    //     <Typography color="textSecondary" className={classes.depositContext}>
    //       on 15 March, 2019
    //   </Typography>
    //     <div>
    //       <br></br>
    //       <Link color="primary" href="#" onClick={preventDefault}>
    //         Resgate mensal
    //     </Link>
    //     </div>
    //   </React.Fragment>
    // </Paper>

    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>

            <React.Fragment>
              <Title>Acumulo Moedas</Title>
              <Typography component="p" variant="h4">
                250
       </Typography>
              {/* <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
       </Typography> */}
              <div>
                <br></br>
                {/* <Link color="primary" href="#" onClick={preventDefault}>
                  Resgate mensal
         </Link> */}
              </div>
            </React.Fragment>

          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>

            <React.Fragment>
              <Title>Moedas para doar</Title>
              <Typography component="p" variant="h4">
                100
       </Typography>
              {/* <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
       </Typography> */}
              <div>
                {/* <br></br> */}
                <Link color="primary" href="#" onClick={preventDefault}>
                  ** Resgate Mensal **
         </Link>
              </div>
            </React.Fragment>

          </Paper>
        </Grid>
      </Grid>
      {/* <Box pt={4}>
        <Copyright />
      </Box> */}
    </Container>




  );
}