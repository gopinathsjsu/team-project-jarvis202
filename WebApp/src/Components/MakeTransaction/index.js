import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  marginspacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const MakeTransaction = () => {
  const classes = useStyles();
  // const [fromAcc, setFromAcc] = React.useState('');
  const [toAcc, setToAcc] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [remarks, setRemarks] = React.useState(0);
  const [otp, setOtp] = React.useState(0);
  const history = useHistory();


  // to-do: fetch the account numbers and the type of account 
  const fromAccOptions = ['Mamatha - savings', 'Mamatha - Checkings']

  // const handleFromAccChange = async (e) => {
  //   setFromAcc(e.target.value);
  //   console.log("set the from account value")
  // }

  const handleToAccChange = async (e) => {
    setToAcc(e.target.value);
    console.log("set TO account value")
  }

  const handleSubmit = async () => {
    console.log('submitted')
  }

  const handleCancel = async () => {
    // clear the fields
    console.log('cancel funds transfer')
  }

  return (
    <Container className={classes.marginspacing}>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField required id='toAccount' label='To Account' variant='outlined' onChange={(event) => setToAcc(event.target.value)} />
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

export default MakeTransaction;
