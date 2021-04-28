import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ServiceAPI from './../ServiceAPI';
import { useHistory, useLocation } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  marginspacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const ValidateOTP = (props) => {
  const classes = useStyles();
  const [otp, setOTP] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const history = useHistory();
  const location = useLocation();
  const [varDetails, setVarDetails] = React.useState(location.state.varDetails);
  const [otpNum, setOtpNum] = React.useState(location.state.varDetails.otpCode);
  const [operationType, setOperationType] = React.useState(location.state.varDetails.type);
  const [showPhone, setshowPhone] = React.useState(location.state.varDetails.phoneNumber);

  useEffect(() => {
    var pn = showPhone;
    pn = pn.substr(0, 2) + '*******' + pn.substr(8);
    setshowPhone(pn);
  }, []);

  const handleResend = async () => {
    console.log('resend the same otp again');
    await ServiceAPI.sendOTP(varDetails.phoneNumber).then(function (response) {
      setOtpNum(response.data)
      console.log(response)
    }).catch(function (error) {
      console.log('Unable to send otp', error);
    })
  }

  const handlecloseSnack = () => {
    setHasError(false);
  }

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log('vardetails')
    console.log(location.state.varDetails)
    console.log("Operation type")
    console.log(operationType)
    if (operationType === 'addAccount') {
      const accountDetails = {
        custAccountID: varDetails.customerId,
        accountType: varDetails.accountType,
        coApplicant: varDetails.coApplicant,
        accountStatus: varDetails.accountStatus,
        relationshipStatus: varDetails.relationshipStatus
      }
      if (otpNum == otp) {
        // waiting for api to be implemented 
        // await ServiceAPI.addAccount(accountDetails).then(function (response){
        // console.log(response)
        // }).catch(function (error) {
        //   console.log('Unable to send otp', error);
        // });
      }
      else {
        setErrorMessage('Invalid OTP, Please Try again');
        setHasError(true);
      }
    }
    else if (operationType === 'addRecepient') {
      const recepientDetails = {
        custAccountID: varDetails.custAccountID,
        firstName: varDetails.firstName,
        lastName: varDetails.lastName,
        zipCode: varDetails.zipCode,
        accountNum: varDetails.accountNum,
        nickName: varDetails.nickName,
        routingNumber: varDetails.routingNumber,
        isSameBank: varDetails.isSameBank
      }
      if (otpNum == otp) {
        ServiceAPI.addRecepient(recepientDetails).then(function (response) {
          console.log(response)
          history.push('/manageRecepients')
        }).catch(function (error) {
          console.log('Unable to add account', error);
        });
      }
      else {
        setErrorMessage('Invalid OTP, Please Try again');
        setHasError(true);
      }
    }
  }

  const handleCancelOTP = () => {
    console.log('test');
    history.push('/manageRecepients')
  }

  return (
    <Container>
      <Typography align='left' variant='h4'>
        Confirm OTP
      </Typography>
      <Typography align='left' variant='h6'>
        A verification code has been sent to your mobile {showPhone}. Please confirm it!
      </Typography>
      <Grid container className={classes.marginspacing}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            autoFocus
            margin='dense'
            id='otpCode'
            label='OTP'
            onChange={(event) => setOTP(event.target.value)}
          />
        </Grid>
        <Grid container className={classes.marginspacing}>
          <Grid item xs={12} align='left' className={classes.marginspacing}>
            <Button type='submit' variant='contained' color='primary' onClick={handleResend}>Resend OTP</Button>
            <Button type='submit' variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
            <Button type='submit' variant='contained' color='primary' onClick={handleCancelOTP}>Cancel</Button>
            <Snackbar open={hasError} autoHideDuration={6000} onClose={handlecloseSnack}>
              <Alert onClose={handlecloseSnack} severity='error'>
                {errorMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ValidateOTP
