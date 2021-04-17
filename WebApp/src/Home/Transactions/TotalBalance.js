import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Title from './Title';

export const TotalBalance = () => {
  return (
    <React.Fragment>
      <Title>Total Balance (Savings + Deposits)</Title>
      <Typography component="p" variant="h4">
        $30,024.00
      </Typography>
      <Typography color="textSecondary">
        on 11 March, 2021
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper>
          <div className="balanceTab">
            <span>Savings</span>
            <div>$10,024.00</div>
          </div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <div className="balanceTab">
              <span>Deposits</span>
              <div>$10,000.00</div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <div className="balanceTab">
              <span>Cheques in Clearing</span>
              <div>$10,000.00</div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TotalBalance;