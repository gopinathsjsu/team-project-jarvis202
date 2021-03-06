import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ServiceAPI from '../ServiceAPI'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom'

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
  },
  paddingSpacing: {
    paddingLeft: "24px !important",
    paddingRight: "24px !important",
    paddingTop: "24px"
  }
}));

const AddAccount = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [ph, setPh] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [dob, setDOB] = React.useState(new Date());
  const [occupation, setOccupation] = React.useState('');
  const [incomeSource, setIncomeSource] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [addressState, setAddressState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [zipCode, setZipCode] = React.useState();
  const [coApplicant, setCoApplicant] = React.useState('');
  const [accountType, setAccountType] = React.useState('')
  const [checked, setChecked] = React.useState(false);
  const [relation, setRelation] = React.useState('');
  const [custDetails, setCustDetails] = React.useState({});
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const [contactDetails, setContactDetails] = React.useState({})
  const [openRelation, setOpenRelation] = React.useState(false);
  const [openAccountType, setOpenAccountType] = React.useState(false);
  const [accounts, setAccounts] = React.useState([])
  const history = useHistory();

  // TODO:update with the props later
  const handleSubmit = (event) => {
    // TODO:Update the Customer info and send mail to the customer
    if (custDetails !== null && custDetails.account.length === 2) {
      setErrorMessage('You are not eligible to add account in this bank , as you already have 2 accounts of type : Savings and Checkings ')
      setHasError(true);
    }
    else if (coApplicant !== '' && relation === '') {
      setErrorMessage('If you have specified Co-Applicant name, Please Fill in the Co-Applicant relation !');
      setHasError(true);
    }
    else {
      ServiceAPI.sendOTP(ph).then(function (response) {
        console.log(response);
        const varDetails = {
          customerId: custDetails.customerId,
          accountType: accountType,
          coApplicant: coApplicant,
          accountStatus: 'ACTIVE',
          balance: 0,
          relationshipStatus: relation,
          phoneNumber: ph,
          emailid: email,
          otpCode: response.data,
          type: 'addAccount'
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

  const handleCancel = (event) => {
    history.push('/home');
  }

  const handlecloseSnack = () => {
    setHasError(false);
  }

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem('custDetails'));
    console.log('username')
    console.log(sessionDetails.uname)
    ServiceAPI.getCustomerDetailsByUserName(sessionDetails.uname).then(function (response) {
      setCustDetails(response.data[0]);
      const accDetails = response.data[0].account;
      console.log(accDetails.length)
      if (accDetails.length > 0) {
        const accn = []

        accDetails.forEach(function (acc) {
          if (acc.accountStatus !== 'CLOSED') {
            accn.push(acc.accNumber)
          }
        });

        setAccounts(accn);

        if (accn.length === 2) {
          setErrorMessage('You are not eligible to add account in this bank , as you already have 2 accounts of type : Savings and Checkings ')
          setHasError(true);
        }
      }

      // else {
      console.log('response')
      console.log(response.data[0]);
      setCustDetails(response.data[0]);
      setFirstName(response.data[0].firstName);
      setLastName(response.data[0].lastName);
      setPh(response.data[0].phoneNumber);
      setEmail(response.data[0].emailId);
      setMiddleName(response.data[0].middleName);
      setDOB(response.data[0].dateOfBirth);
      setOccupation(response.data[0].occupation);
      setIncomeSource(response.data[0].sourceOfIncome);
      setAddress1(response.data[0].fullAddress);
      setCity(response.data[0].city);
      setAddressState(response.data[0].state);
      setCountry(response.data[0].country);
      setZipCode(response.data[0].zipcode);
      // }
    })
      .catch(function (error) {
        console.log('Unable to fetch customer details', error);
        setCustDetails({});
      });
  }, []);

  const handleRelation = (e) => {
    setCoApplicant(e.target.value)
  }
  const accountTypeChange = (e) => {
    console.log('account type', e.target.value)
    setAccountType(e.target.value)
  }

  // disableRelation = () => {
  //   if (coApplicant === '') {

  //   }
  // }

  return (
    <Container className={classes.paddingSpacing}>
      <Snackbar open={hasError} autoHideDuration={6000} onClose={handlecloseSnack}>
        <Alert onClose={handlecloseSnack} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Typography align='left' variant='h5'>
        Review Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField disabled id='firstName' label='First Name' value={firstName || ''} />
          <TextField disabled id='middleName' label='Middle Name' value={middleName || ''} />
          <TextField disabled id='lastName' label='Last Name' value={lastName || ''} />
        </Grid>

        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField disabled id='ph' label='Phone' value={ph || ''} />
          <TextField disabled id='email' label='Email ID' value={email || ''} />
        </Grid>
        <Grid item xs={12} align='left'>
          <TextField disabled id='dob' label='Date of Birth' value={dob || ''} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField disabled id='occupation' label='Occupation' value={occupation || ''} />
          <TextField disabled id='incomeSource' label='Source of Income' value={incomeSource || ''} />
        </Grid>
        <Grid item xs={12} align='left'>
          <Typography align='left'>
            Address :
          </Typography>
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField disabled id='address1' label='Address 1' value={address1 || ''} />
          <TextField disabled id='address2' label='Address 2' value={address2 || ''} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField disabled id='city' label='City' value={city || ''} />
          <TextField disabled id='state' label='State' value={addressState || ''} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField disabled id='country' label='Country' value={country || ''} />
          <TextField disabled id='zipCode' label='Zip Code' value={zipCode || ''} />
        </Grid>
        <Grid item xs={12} align='left'>
          <Typography align='left' color='primary'>
            Select Account Type
          </Typography>
        </Grid>
        <Grid item xs={12} align='left'>
          <div className={classes.marginspacing}>
            <FormControl className={classes.formControl}>
              <InputLabel>Account Type</InputLabel>
              <Select
                id='accounttype'
                value={accountType}
                // onOpen={setOpenRelation(true)}
                // onClose={setOpenRelation(false)}
                onChange={accountTypeChange}
              >
                <MenuItem value='Checkings'>Checkings</MenuItem>
                <MenuItem value='Savings'>Savings</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} align='left'>
          <Typography align='left' color='primary'>
            Add a Co-Applicant? (Optional)
          </Typography>
        </Grid>
        <Grid item xs={12} align='left'>
          <div className={classes.marginspacing}>
            <TextField id='coApplicant' label='Co-Applicant Name' onChange={(event) => setCoApplicant(event.target.value)} />
            <FormControl className={classes.formControl}>
              <InputLabel>Relation</InputLabel>
              <Select
                disabled={coApplicant === ''}
                id='rel'
                value={relation}
                // onOpen={setOpenRelation(true)}
                // onClose={setOpenRelation(false)}
                onChange={handleRelation}
              >
                <MenuItem value='Mother'>Mother</MenuItem>
                <MenuItem value='Father'>Father</MenuItem>
                <MenuItem value='Sister'>Sister</MenuItem>
                <MenuItem value='Brother'>Brother</MenuItem>
                <MenuItem value='Wife'>Wife</MenuItem>
                <MenuItem value='Husband'>Husband</MenuItem>
                <MenuItem value='Son'>Son</MenuItem>
                <MenuItem value='Daughter'>Daughter</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} align='left'>
          <div>
            <Typography align='left' variant='h6' color='error' gutterBottom>
              Terms & Conditions
            </Typography>
            <Typography align='left' variant='subtitle1' color='primary' gutterBottom>
              By signing below you represent and agree that :
            </Typography>
            <Typography align='left' variant='body1' gutterBottom>
              1. You are the person named in the 'Applicant' or 'Co-Applicant' section and all the information in the application is,
              to best of your knowledge is correct.
            </Typography>
            <Typography align='left' variant='body1' gutterBottom>
              2. You received, opened, reviewed, and agree to the Deposit Product, Consumer Privacy and Affiliate marketing legal Documents
              included in the links found on this page and agree to receive other electronic communications as described in the Deposit Product Legal Documents.
            </Typography>
            <Typography align='left' variant='body1' gutterBottom>
              3. You consent to being contacted at the telephone number you provided. You agree that the bank may use automatic telephone dialing systems and
              prerecorded voice messaging in connection with call or texts made to any telephone number you provided even if the telephone number is
              a cellular/mobile telephone number for which the called party is charged. You also agree that the bank may monitor and/or record telephone calls to assure
              the quality of our service.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <FormControlLabel
            control={<Checkbox color='primary' checked={checked} onChange={(event) => setChecked(event.target.checked)} name='checked' />}
            label={`${firstName} ${lastName}`}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button type='submit' disabled={!checked} variant='contained' color='primary' onClick={handleSubmit}>Open Account</Button>
          <Button type='submit' variant='contained' color='primary' onClick={handleCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddAccount;
