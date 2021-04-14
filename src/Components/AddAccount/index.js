import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from '@material-ui/core'


import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({

  marginspacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const AddAccount = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [ph, setPh] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [citizenship, setCitizenship] = React.useState('');
  const [residence, setResidence] = React.useState('');
  const [dob, setDOB] = React.useState(new Date());
  const [occupation, setOccupation] = React.useState('');
  const [incomeSource, setIncomeSource] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [addressState, setAddressState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [citizenshipStatus, setCitizenshipStatus] = React.useState('');
  const [zipCode, setZipCode] = React.useState();
  const [coApplicant, setCoApplicant] = React.useState('');

  const [checked, setChecked] = React.useState(false);
  const [relation, setRelation] = React.useState('');
  const relations = ['Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister'];

  // TODO:update with the props later
  const fullName = 'Mamatha Guntu';
  const handleSave = (event) => {
    //TODO:Update the Customer info
  }
  const handleSubmit = (event) => {
    //TODO:Update the Customer info and send mail to the customer
  }
  const handleCancel = (event) => {
    //TODO:return to customer home page
  }
  const handleChange = (event) => {
    //TODO: update the validations 
  }
  return (
    <Container >
      <Typography align='left' variant='h5'>
        Review Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='firstName' label='First Name' onChange={handleChange} />
          <TextField id='middleName' label='Middle Name' />
          <TextField required id='lastName' label='Last Name' />
        </Grid>

        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='ph' label='Phone' value={ph} onChange={(event) => setPh(event.target.value)} />
          <TextField required id='email' label='Email ID' value={email} onChange={(event) => setEmail(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disablePast='false'
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              label='Date of Birth'
              value={dob}
              onChange={(e, date) => setDOB(date)}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='occupation' label='Occupation' onChange={(event) => setOccupation(event.target.value)} />
          <TextField id='incomeSource' label='Source of Income' onChange={(event) => setIncomeSource(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left'>
          <Typography align='left'>
            Address :
          </Typography>
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='address1' label='Address 1' value={address1} onChange={(event) => setAddress1(event.target.value)} />
          <TextField id='address2' label='Address 2' value={address2} onChange={(event) => setAddress2(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='city' label='City' value={city} onChange={(event) => setCity(event.target.value)} />
          <TextField required id='state' label='State' value={addressState} onChange={(event) => setAddressState(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='country' label='Country' value={country} onChange={(event) => setCountry(event.target.value)} />
          <TextField required id='zipCode' label='Zip Code' value={zipCode} onChange={(event) => setZipCode(event.target.value)} />
        </Grid>
        <Grid item xs={12} align='left'>
          <Typography align='left'>
            Add a Co-Applicant? (Optional)
          </Typography>
        </Grid>
        <Grid item xs={12} align='left'>
          <div className={classes.marginspacing}>
            <TextField id='coApplicant' label='Co-Applicant Name' value={coApplicant} onChange={(event) => setCoApplicant(event.target.value)} />
            <Autocomplete
              options={relations}
              id='relations'
              relations
              style={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label='Relationship' onChange={(event) => setRelation(event.target.value)} />}
            />
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
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.value)} name='checked' />}
            label={fullName}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button type='submit' variant='contained' color='error' onClick={handleSubmit}>Open Account</Button>
          <Button type='submit' variant='contained' color='error' onClick={handleCancel}>Cancel</Button>
        </Grid>
      </Grid>


    </Container>
  )
}

export default AddAccount;
