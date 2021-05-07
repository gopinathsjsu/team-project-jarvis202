import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TotalBalance from './TotalBalance';
import RecentTransactions from './RecentTransactions';
import AllTransactions from './AllTransactions';
import ServiceAPI from '../../Components/ServiceAPI'

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
  const [transactionDetails, setTransactionDetails] = React.useState([]);
  const [recentTransactionDetails, setRecentTransactionDetails] = React.useState([]);
  const [savings, setSavings] = React.useState(0);
  const [checkings, setCheckings] = React.useState(0);

  useEffect(() => {
    // var sessionDetails = JSON.parse(sessionStorage.getItem("custDetails"));
    // let sessionDetails = {};
    // sessionDetails.uname = "TestUser4";
    ServiceAPI.getCustomerDetailsByUserName("TestUser4").then(function (response) {
      if (response.data[0].transactions.length > 0) {
        const rowData = response.data[0].transactions;
        const allTransactions = [];
        rowData.forEach(transaction => {
          let rowDetails = {};
          rowDetails.id = transaction.transactionId;
          rowDetails.remark = transaction.description;
          rowDetails.amount = transaction.amount;
          rowDetails.type = transaction.transactionType;
          rowDetails.transactionDate = transaction.transactionDate;
          allTransactions.push(rowDetails);
        });
        const recentTransactions = allTransactions.sort().slice(0, 5);
        setTransactionDetails(allTransactions);
        setRecentTransactionDetails(recentTransactions);
      }

      const savingsAcc = response.data[0].account.find(acc => {
        return acc.accountType === 'Savings'
      });

      if (savingsAcc) {
        setSavings(savingsAcc.balance)
      };

      const checkingAcc = response.data[0].account.find(acc => {
        return acc.accountType === 'Checkings'
      });
      
      if (checkingAcc) {
        setCheckings(checkingAcc.balance) 
      }
    })
      .catch(function (error) {
        console.log('Unable to fetch transaction details', error);
      });
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Total Balance */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <TotalBalance savings={savings} checkings={checkings}/>
          </Paper>
        </Grid>
        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecentTransactions recentTransactionDetails={recentTransactionDetails}/>
          </Paper>
        </Grid>
        {/* All Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AllTransactions transactionDetails={transactionDetails}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Transactions;
