import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TotalBalance from './TotalBalance';
import RecentTransactions from './RecentTransactions';
import AllTransactions from './AllTransactions';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export const Transactions = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Total Balance */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <TotalBalance />
          </Paper>
        </Grid>
        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecentTransactions />
          </Paper>
        </Grid>
        {/* All Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AllTransactions />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Transactions;
