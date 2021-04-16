import React, { useRef } from 'react'
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
  const sigCanvas = useRef()

  const [isValidAcc, setIsValidAcc] = React.useState(false);

  const handleSave = (event) => {
    //TODO:Update the Customer and account info 
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
  const handleClear = () => {
    sigCanvas.current.clear();
  }
  const handleSigSave = () => {
    // To-do : save the signature in the database
    console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
  }
  const validateAccNum = (event) => {
    setConfirmAcc(event.target.value)
    if (accNum !== confirmAcc) {
      console.log('Invalid account number')
    }
  }

  return (
    <Container>
      <Box pt={6}>
        <Grid container spacing={3} pt={6}>
          <Typography align='left' variant='h8'>
            Name in Account
          </Typography>
          <Grid item xs={12} align='left' className={classes.marginspacing}>
            <TextField required id='firstName' label='First Name' onChange={handleChange} />
            <TextField id='middleName' label='Middle Name' />
            <TextField required id='lastName' label='Last Name' />
          </Grid>
          <Grid item xs={12} align='left' className={classes.marginspacing}>
            <TextField required id='accNum' label='Account Number' value={accNum} onChange={(event) => setAccNum(event.target.value)} />
            <TextField required id='confirmAcc' label='Confirm Account Number' value={confirmAcc} onChange={validateAccNum} />
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
          <Typography align='left' variant='h8'>
            Sign
          </Typography>
          <Grid item xs={12} align='left'>
            <Box border={1} borderColor="text.primary">
              <SignatureCanvas
                ref={sigCanvas}
                penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
              <Button type='submit' variant='contained' onClick={handleClear}>Clear</Button>
              <Button type='submit' variant='contained' onClick={handleSigSave}>Save</Button>
            </Box>

          </Grid>
          <Grid item xs={12} align='left'>
            <Button type='submit' variant='contained' color='primary' onClick={handleSave}>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Container >
  )
}
export default CloseAccount;
