import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SignatureCanvas from 'react-signature-canvas'
import { useHistory } from 'react-router-dom'
import ServiceAPI from '../ServiceAPI'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({

  marginspacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const CloseAccount = () => {

  const classes = useStyles();
  const [firstName, setFirstName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [accNum, setAccNum] = React.useState('');
  const [confirmAcc, setConfirmAcc] = React.useState('');
  const [citizenship, setCitizenship] = React.useState('');
  const [residence, setResidence] = React.useState('');
  const [dob, setDOB] = React.useState(new Date());
  // const sigCanvas = useRef()
  const history = useHistory();
  const [isValidAcc, setIsValidAcc] = React.useState(false);
  const [custDetails, setCustDetails] = React.useState({});
  const [username, setUsername] = React.useState(custDetails.userName);
  const [accounts, setAccounts] = React.useState([])
  const [hasError, setHasError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [ph, setPh] = React.useState(0);
  const [email, setEmail] = React.useState('')

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem('custDetails'));
    ServiceAPI.getCustomerDetailsByUserName(sessionDetails.uname).then(function (response) {
      if (response.data.length > 0) {
        setCustDetails(response.data[0]);
        setFirstName(response.data[0].firstName);
        setLastName(response.data[0].lastName);
        setPh(response.data[0].phoneNumber);
        setEmail(response.data[0].emailId);
        setMiddleName(response.data[0].middleName);
        const accDetails = response.data[0].account;
        if (accDetails.length > 0) {
          const accn = []

          accDetails.forEach(function (acc) {
            console.log(acc.accountStatus)
            if (acc.accountStatus !== 'CLOSED') {
              accn.push(acc.accNumber)
            }
          });
          setAccounts(accn);
          if (accn.length === 0) {
            setErrorMsg('You do not have any ACTIVE accounts to close !')
            setHasError(true);
          }
        }
      }
    })
      .catch(function (error) {
        console.log('Unable to fetch customer details', error);
        setCustDetails({});
      });
  }, []);

  // const handleSave = (event) => {
  //   //TODO:Update the Customer and account info 
  // }
  const handleSubmit = (event) => {
    // custDetails.account. {
    // console.log(custDetails)
    console.log('accounts', accounts)
    if (accounts.length === 0) {
      setErrorMsg('You do not have any active accounts to close !')
      setHasError(true);
    }
    const idx = accounts.indexOf(parseInt(accNum))
    if (idx === -1) {
      console.log(accNum)
      setErrorMsg('Invalid Account Number, Please provide your valid account Number');
      setHasError(true);
    }
    else {
      const balance = custDetails.account[idx].balance;
      if (balance > 0) {
        setErrorMsg('Please clear all the balances to close the account !');
        setHasError(true);
      }
      else {
        // custDetails['account'][idx]['accountStatus'] = 'CLOSED';
        custDetails.account[idx].accountStatus = 'CLOSED'
        ServiceAPI.sendOTP(ph).then(function (response) {
          console.log(response);
          const varDetails = {
            customerId: custDetails.customerId,
            custDetails: custDetails,
            otpCode: response.data,
            phoneNumber: custDetails.phoneNumber,
            type: 'closeAccount'
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

    console.log(custDetails)
    // if (acc.accNumber === accNum) {
    //   acc.push("accountStatus", "INACTIVE")

    // }
    // });
  }
  const handleCancel = (event) => {
    history.push('/home');
  }
  // const handleAccountNum = () => {
  //   if (!accounts.includes(accNum)) {
  //     console.log('Please provide valid account')
  //   }
  //   console.log('test')
  // }
  const handleChange = (event) => {
    //TODO: update the validations 
  }
  const handlecloseSnack = () => {
    setHasError(false);
    if (errorMsg === 'You do not have any ACTIVE accounts to close !') {
      history.push('/home');
    }
  }


  // const handleClear = () => {
  //   sigCanvas.current.clear();
  // }

  // const handleSigSave = () => {
  //   // To-do : save the signature in the database
  //   console.log(sigCanvas.current.getTrimmedCanvas().toDataURL('image / png'))
  //   const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image / png');
  //   const blobData = dataURItoBlob(dataUrl);
  //   const params = { Key: username, ContentType: 'image/jpeg', Body: blobData };
  // }
  // const validateAccNum = (event) => {
  //   setConfirmAcc(event.target.value)
  //   if (accNum !== confirmAcc) {
  //     console.log('Invalid account number')
  //   }
  // }

  return (
    <Container>
      <Snackbar open={hasError} autoHideDuration={6000} onClose={handlecloseSnack}>
        <Alert onClose={handlecloseSnack} severity='error'>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Box pt={6}>
        <Grid container spacing={3} pt={6}>
          <Typography align='left' variant='h6'>
            Name in Account
          </Typography>
          <Grid item xs={12} align='left' className={classes.marginspacing}>
            <TextField disabled id='firstName' label='First Name' value={firstName} />
            <TextField disabled id='middleName' label='Middle Name' value={middleName} />
            <TextField disabled id='lastName' label='Last Name' value={lastName} />
          </Grid>
          <Grid item xs={12} align='left' className={classes.marginspacing}>
            <TextField required id='accNum' label='Account Number' onChange={(event) => setAccNum(event.target.value)} />
            <TextField required id='confirmAcc' label='Confirm Account Number' onChange={(event) => setConfirmAcc(event.target.value)} />
            {/* {isValidAcc} ? <Icon  */}
          </Grid>
          <Grid item xs={12} align='left'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disablePast='false'
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                label='Date'
                value={dob}
                onChange={(e, date) => setDOB(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Typography align='left' variant='h6'>
            Sign
          </Typography>
          {/* <Grid item xs={12} align='left'>
            <Box border={1} borderColor='text.primary'>
              <SignatureCanvas
                ref={sigCanvas}
                penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
              <Button type='submit' variant='contained' onClick={handleClear}>Clear</Button>
              <Button type='submit' variant='contained' onClick={handleSigSave}>Save</Button>
            </Box>
          </Grid> */}
          <Grid item xs={12} align='left'>
            <Button type='submit' variant='contained' color='primary' onClick={handleSubmit}>Submit</Button>
            <Button type='submit' variant='contained' color='primary' onClick={handleCancel}>Cancel</Button>
          </Grid>
        </Grid>
      </Box>
    </Container >
  )
}
export default CloseAccount;
