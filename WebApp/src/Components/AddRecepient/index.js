import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ServiceAPI from './../ServiceAPI';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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


const AddRecepient = () => {
  const classes = useStyles();
  const [recepientName, setRecepientName] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('sameBank');
  const [disableRN, setDisableRN] = React.useState(true);
  const [routeNum, setRouteNum] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [zipCode, setZipCode] = React.useState(0);
  const [recAcc, setRecAcc] = React.useState(0);
  const [confirmRecAcc, setConfirmRecAcc] = React.useState(0);
  const [nickName, setNickName] = React.useState('');
  const [custDetails, setcustDetails] = React.useState({});
  const [isSameBank, setIsSameBank] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const history = useHistory();

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem("custDetails"));

    ServiceAPI.getCustContactDetails(sessionDetails.uname).then(function (response) {
      console.log(response.data[0])
      setcustDetails(response.data[0]);
    })
      .catch(function (error) {
        console.log('Unable to fetch customer contact details', error);
      });
  }, []);
  const handleAccountNum = (e) => {
    if (e.target.id === 'accNum') {
      setRecAcc(e.target.value);
    }
    else if (e.target.id === 'confirmAccNum') {
      setConfirmRecAcc(e.target.value);
    }
    else if (recAcc !== '' && confirmRecAcc !== '' && recAcc !== confirmRecAcc) {
      // throw error
      setErrorMessage('Account number does not match !');
      setHasError(true);
    }
  }

  const handleRadioChange = (e) => {
    if (e.target.value === 'isSameBank') {
      setDisableRN(true);
      setIsSameBank(true);
      // Update with the route number of the current bank
      setRouteNum(0);
    }
    else {
      setDisableRN(false);
      setIsSameBank(false);
    }
  };

  const handleCancel = () => {
    history.push('/manageRecepients')
  }

  // const validateData = () => {
  //   if (lastName === '' || zipCode === 0 || recAcc === 0 || confirmRecAcc === 0 || (!isSameBank && routeNum === 0)) {
  //     return false;
  //   }
  //   return true;
  // }

  const handleAddRec = () => {
    if (lastName === '' || zipCode === 0 || recAcc === 0 || confirmRecAcc === 0 || (!isSameBank && routeNum === 0)) {
      setErrorMessage('Mandatory fields are missing !! Please fill in the required fields !');
      setHasError(true);
    }
    else if (confirmRecAcc !== recAcc) {
      setErrorMessage('Account number does not match !');
      setHasError(true);
    }
    else {
      ServiceAPI.sendOTP(custDetails.phoneNumber).then(function (response) {
        console.log(response);
        const varDetails = {
          custAccountID: custDetails.customerId,
          firstName: firstName,
          lastName: lastName,
          zipCode: zipCode,
          accountNum: 12356,
          nickName: nickName,
          routingNumber: 1245,
          isSameBank: isSameBank,
          type: 'addRecepient',
          phoneNumber: custDetails.phoneNumber,
          email: custDetails.emailId,
          otpCode: response.data
        }
        const path = '/validateOTP/:' + varDetails;

        history.push({
          pathname: path,
          state: {
            varDetails: varDetails
          }
        })
      })
    }
  }
  const handlecloseSnack = () => {
    setHasError(false);
  }
  // const handleAdd = async (e) => {
  //   console.log('add recepient')
  //   e.preventDefault();
  //   const resp = {
  //     // update the custAccountId with the db value
  //     custAccountID: 1,
  //     firstName: firstName,
  //     lastName: lastName,
  //     zipCode: zipCode,
  //     accountNum: recAcc,
  //     nickName: nickName,
  //     routingNumber: routeNum,
  //     isSameBank: isSameBank
  //   }
  //   try {
  //     await ServiceAPI.addRecepient(resp).then(response => console.log(response));
  //     console.log('Added recepient')
  //     // history.push('manageRecepients')
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Typography variant='h5' align='left' color='primary'>
            Add Recepient
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            id='fname'
            label='First Name'
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            autoFocus
            margin='dense'
            id='lname'
            required
            label='Last Name'
            onChange={(event) => setlastName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            autoFocus
            margin='dense'
            id='zCode'
            required
            label='ZipCode'
            onChange={(event) => setZipCode(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            autoFocus
            margin='dense'
            id='accNum'
            required
            label='Account Number'
            type='password'
            onChange={handleAccountNum}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            autoFocus
            margin='dense'
            required
            id='confirmAccNum'
            label='Confirm Account Number'
            onChange={handleAccountNum}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            autoFocus
            margin='dense'
            id='nName'
            label='Nick Name'
            onChange={(event) => setNickName(event.target.value)}
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
          <TextField
            autoFocus
            disabled={disableRN}
            margin='dense'
            id='routeNum'
            label='Routing Number'
            onChange={(event) => setRouteNum(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button onClick={handleCancel} color='primary' variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleAddRec} color='primary' variant='contained'>
            Add
          </Button>
          <Snackbar open={hasError} autoHideDuration={6000} onClose={handlecloseSnack}>
            <Alert onClose={handlecloseSnack} severity='error'>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Container >
  )
}

export default AddRecepient
