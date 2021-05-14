import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Title from './Title';

export const TotalBalance = (props) => {
  const date = new Date();
  return (
    <React.Fragment>
      <Title>Total Balance (Savings + Checkings)</Title>
      <Typography component="p" variant="h4">
        ${props.savings + props.checkings}
      </Typography>
      <Typography color="textSecondary">
        on {date.getDate()} {date.toLocaleString('default', { month: 'long' })}, {date.getFullYear()}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper>
            <div className="balanceTab">
              <span>Savings</span>
              <div>${props.savings}</div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <div className="balanceTab">
              <span>Checkings</span>
              <div>${props.checkings}</div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TotalBalance;