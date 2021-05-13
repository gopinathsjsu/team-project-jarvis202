import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ServiceAPI from '../ServiceAPI'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({

  marginspacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const PayBills = () => {
  const classes = useStyles();
  const [fromAcc, setFromAcc] = React.useState('');
  const [toAcc, setToAcc] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [remarks, setRemarks] = React.useState('');
  const [custDetails, setCustDetails] = React.useState({})
  const [fromAccounts, setFromAccounts] = React.useState([])
  const [toAccounts, setToAccounts] = React.useState([])
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setsuccessMessage] = React.useState('')
  const [displayFrom, setDisplayFrom] = React.useState([]);
  const [displayTo, setDisplayTo] = React.useState([]);
  const history = useHistory();
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [recurringDate, setRecurringDate] = React.useState(new Date());

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem('custDetails'));
    ServiceAPI.getCustomerDetailsByUserName(sessionDetails.uname).then(function (response) {
      setCustDetails(response.data[0])
      const customerAccDetails = response.data[0].account;
      const accn = []
      const dp = []
      if (customerAccDetails.length > 0) {
        customerAccDetails.forEach(function (acc) {
          console.log(acc.accountStatus)
          if (acc.accountStatus !== 'CLOSED') {
            accn.push(acc.accNumber.toString())
            dp.push(acc.accNumber.toString() + ' ---  ' + acc.accountType);
          }
        });
        setFromAccounts(accn);
        setDisplayFrom(dp);
      }
      if (accn.length === 0) {
        console.log('You do not have active accounts to transfer funds !')
      }
      // get the recepient details by customer user name
      ServiceAPI.getRecepientsByCustId(sessionDetails.uname).then(function (response) {
        console.log(response);
        const recepientData = [];
        const dpt = []
        if (response.data.length > 0) {
          response.data.forEach(function (row) {
            if (row.companyName !== null && row.firstName === "" && row.lastName === "") {
              recepientData.push(row.accountNum.toString());
              dpt.push(row.accountNum.toString() + ' --- ' + row.companyName);
            }
          })
          setToAccounts(recepientData);
          setDisplayTo(dpt);
        }
      })
        .catch(function (error) {
          console.log('Unable to fetch customer recepient details', error);
        });
    })
      .catch(function (error) {
        console.log('Unable to fetch customer details', error);
        setCustDetails({});
      });
  }, []);

  const handleRecurringChange = (event) => {
    setIsRecurring(event.target.checked);
  }

  const handlecloseSnack = () => {
    setHasError(false);
  }

  const handleSuccessCloseSnack = () => {
    setSuccess(false);
    history.push('/transferActivity')

  }

  const handleSubmit = async () => {
    console.log('submitted')
    console.log(fromAccounts)
    const fa = fromAcc.substring(0, 5);
    const ta = toAcc.substring(0, 5);
    const idx = fromAccounts.indexOf(fa.toString());
    console.log(fa)

    console.log(idx)
    const accountBalance = custDetails.account[idx].balance;
    if (accountBalance < amount) {
      setErrorMessage('Insufficient funds to initiate Transfer!');
      setHasError(true);
    }
    else {
      custDetails.account[idx].balance = accountBalance - amount;

      const todayDate = new Date();

      var transactionDetails = {};
      transactionDetails.transactionId = 1;
      transactionDetails.description = remarks;
      transactionDetails.amount = amount;
      transactionDetails.transactionType = 'DEBIT';
      transactionDetails.fromAccount = fa;
      transactionDetails.transactionDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate() + 1);
      transactionDetails.toAccount = ta;
      // transactionDetails.fromAccount = fromAcc;
      custDetails.transactions.push(transactionDetails);

      const toTransactionDetails = {};
      toTransactionDetails.transactionId = 1;
      toTransactionDetails.description = remarks;
      toTransactionDetails.amount = amount;
      toTransactionDetails.transactionType = 'CREDIT';
      toTransactionDetails.transactionDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate() + 1);
      toTransactionDetails.fromAccount = fa;
      toTransactionDetails.toAccount = ta;
      ServiceAPI.sendOTP(custDetails.phoneNumber).then(function (response) {
        console.log(response);
        const varDetails = {};
        varDetails.customerId = custDetails.customerId;
        varDetails.custDetails = custDetails;
        varDetails.otpCode = response.data;
        varDetails.phoneNumber = custDetails.phoneNumber;
        varDetails.type = 'makeTransfer';

        varDetails.toTransDetails = toTransactionDetails;
        varDetails.toCustAccount = ta;
        // if (isSameBank) {
        //   varDetails.toTransDetails = toTransactionDetails;
        //   varDetails.toCustAccount = ta;
        //   varDetails.sameBank = 1;
        // }
        // else {
        //   varDetails.sameBank = 0;
        // }

        const path = '/validateOTP/:' + varDetails;
        history.push({
          pathname: path,
          state: {
            varDetails: varDetails
          }
        })
      }).catch(function (error) {
        console.log('Unable to send otp', error);
      });
    }

  }

  const handleCancel = async () => {
    // clear the fields
    console.log('cancel funds transfer')
  }

  return (
    <Container className={classes.marginspacing}>
      <Snackbar open={hasError} autoHideDuration={6000} onClose={handlecloseSnack}>
        <Alert onClose={handlecloseSnack} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessCloseSnack}>
        <Alert onClose={handleSuccessCloseSnack} severity='success'>
          {successMessage}
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Autocomplete
            value={fromAcc}
            onChange={(event, newValue) => {
              setFromAcc(newValue);
            }}
            inputValue={fromAcc}
            onInputChange={(event, newInputValue) => {
              setFromAcc(newInputValue);
            }}
            id='fromAccount'
            options={displayFrom}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label='From Account' variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Autocomplete
            onInputChange={(event, newInputValue) => {
              setToAcc(newInputValue);
            }}
            id='toAccount'
            options={displayTo}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label='To Company' variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='amount' label='Amount ($)' variant='outlined' onChange={(event) => setAmount(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField label='Remarks (Optional)' variant='outlined' onChange={(event) => setRemarks(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={isRecurring} onChange={handleRecurringChange} name="checkedA" color="primary"/>}
              label="Set Recurring Payment" 
            />
          </FormGroup>
        </Grid>
        {isRecurring ? <Grid item xs={12} align='left' className={classes.marginspacing}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disablePast='false'
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                label='Date'
                value={recurringDate}
                onChange={(e, date) => setRecurringDate(date)}
              />
            </MuiPickersUtilsProvider>
        </Grid> : null}
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button type='submit' variant='contained' onClick={handleSubmit}>Continue</Button>
          <Button type='submit' variant='contained' onClick={handleCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PayBills
