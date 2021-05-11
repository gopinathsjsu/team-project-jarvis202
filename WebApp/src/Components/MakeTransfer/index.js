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
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

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

const MakeTransfer = () => {
  const classes = useStyles();
  const [fromAcc, setFromAcc] = React.useState('');
  const [toAcc, setToAcc] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [remarks, setRemarks] = React.useState('');
  const [otp, setOtp] = React.useState(0);
  const [custDetails, setCustDetails] = React.useState({})
  const [fromAccounts, setFromAccounts] = React.useState([])
  const [toAccounts, setToAccounts] = React.useState([])
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setsuccessMessage] = React.useState('')
  const [isSameBank, setIsSameBank] = React.useState(true);
  const [sameBankAcc, setSameBankAcc] = React.useState([]);
  const [diffAcc, setDiffAcc] = React.useState([]);
  const [displayFrom, setDisplayFrom] = React.useState([]);
  const [displayTo, setDisplayTo] = React.useState([]);
  const history = useHistory();

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
        const diffBank = [];
        const sameBK = [];
        if (response.data.length > 0) {
          response.data.forEach(function (row) {
            console.log('samebank', row.sameBank)
            if (row.sameBank === false) {
              diffBank.push(row.accountNum.toString() + ' --- ' + row.nickName)
            }
            else {
              sameBK.push(row.accountNum.toString() + ' --- ' + row.nickName);
            }
            recepientData.push(row.accountNum.toString());
            dpt.push(row.accountNum.toString() + ' --- ' + row.nickName);
          })
          setToAccounts(recepientData);
          setDisplayTo(dpt);
          setSameBankAcc(sameBK);
          setDiffAcc(diffBank);
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

  const handleRadioChange = (e) => {

    if (e.target.value === 'isSameBank') {
      setDisplayTo(sameBankAcc);
      setIsSameBank(true);
      // Update with the route number of the current bank
    }
    else {
      setDisplayTo(diffAcc);
      setIsSameBank(false);
    }
  };

  // to-do: fetch the account numbers and the type of account 

  // const handleFromAccChange = async (e) => {
  //   setFromAcc(e.target.value);
  //   console.log('set the from account value')
  // }

  // const handleToAccChange = async (e) => {
  //   setToAcc(e.target.value);
  //   console.log('set TO account value')
  // }
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

        if (isSameBank) {
          varDetails.toTransDetails = toTransactionDetails;
          varDetails.toCustAccount = ta;
          varDetails.sameBank = 1;
        }
        else {
          varDetails.sameBank = 0;
        }

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
          <FormControl component='fieldset'>
            <RadioGroup row aria-label='position' name='isSameBank' defaultValue='top'>
              <FormControlLabel
                value='isSameBank'
                control={<Radio id='sameBank' color='primary' onChange={handleRadioChange} />}
                label='Same Bank'
                labelPlacement='end'
              />
              <FormControlLabel
                value='isOtherBank'
                control={<Radio id='otherBank' color='primary' onChange={handleRadioChange} />}
                label='Other Bank'
                labelPlacement='end'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Autocomplete
            onInputChange={(event, newInputValue) => {
              setToAcc(newInputValue);
            }}
            id='toAccount'
            options={displayTo}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label='To Account' variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='amount' label='Amount ($)' variant='outlined' onChange={(event) => setAmount(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField label='Remarks (Optional)' variant='outlined' onChange={(event) => setRemarks(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button type='submit' variant='contained' onClick={handleSubmit}>Continue</Button>
          <Button type='submit' variant='contained' onClick={handleCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MakeTransfer
