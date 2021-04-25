import React from 'react'
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

  const [otpNum, setOtpNum] = React.useState(0);

  const handleResend = async () => {

    console.log('resend the same otp again');
    setOtpNum(await Math.floor(1000 + Math.random() * 9000));
    console.log(otpNum)
  }

  const handlecloseSnack = () => {
    setHasError(false);
  }

  const handleConfirm = async (e) => {
    e.preventDefault();
    ServiceAPI.sendOTP()
    if (otp !== otpNum) {
      setErrorMessage('Invalid OTP ! Please try again');
      setHasError(true);
    }
    else {
      console.log('add recepient')

      const recDetails = await location.state.recepientDetails;
      console.log(recDetails)
      try {
        await ServiceAPI.addRecepient(recDetails).then(response => console.log(response));
        console.log('Added recepient')
        history.push('/manageRecepients')
      } catch (error) {
        console.log(error);
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
        A verification code has been sent to your mobile xxxx055 and your email xxxxguntu.@gmail.com. Please confirm it!
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
