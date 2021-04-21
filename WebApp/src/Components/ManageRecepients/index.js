import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ServiceAPI from './../ServiceAPI';
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

const ManageRecepients = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
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
  const [custAccountNum, setcustAccountNum] = React.useState(0);
  const [isSameBank, setIsSameBank] = React.useState(true);

  const columns = [
    { id: 'recepientID', label: 'Recepient ID', minWidth: 120 },
    { id: 'fullName', label: 'Name', minWidth: 120, },
    { id: 'nickName', label: 'Nick Name', minWidth: 120 },
    { id: 'accountNum', label: 'Account Number', minWidth: 120 },
    { id: 'zipCode', label: 'ZipCode', minWidth: 120, },
  ];


  function createData(recepientID, firstName, lastName, nickName, accountNum, zipCode) {
    const fullName = `${firstName} ${lastName}`
    return { recepientID, fullName, nickName, accountNum, zipCode };
  }

  // To-Do : update with the real data from the database
  const rows = [
    createData('12325649', 'srujana', 'k', 'sruj', 123564, 95134),
    createData('12325640', 'umashankar', 'k', 'uma', 1236564, 95134),
    createData('12325684', 'mamatha', 'g', 'mamat', 1235064, 95134),
    createData('12325645', 'prajakta', 'j', 'pj', 1263564, 95134),
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    // to-do
    console.log(e.target.value)
    console.log('Display data based on the type of the recepient searched selected')
  }

  const handleCreate = async (e) => {
    setOpen(true);
  }

  const handleAdd = async (e) => {
    console.log('add recepient')
    e.preventDefault();
    const resp = {
      // update the custAccountId with the db value
      custAccountID: 1,
      firstName: firstName,
      lastName: lastName,
      zipCode: zipCode,
      accountNum: recAcc,
      nickName: nickName,
      routingNumber: routeNum,
      isSameBank: isSameBank
    }
    try {
      await ServiceAPI.addRecepient(resp).then(response => console.log(response));
    } catch (error) {
      console.log(error);
    }
  }
  const handleClose = () => {
    setOpen(false);
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

  const handleAccountNum = (e) => {
    if (e.target.id === 'accNum') {
      setRecAcc(e.target.value);
    }
    else if (e.target.id === 'confirmAccNum') {
      setConfirmRecAcc(e.target.value);
    }
    else if (recAcc !== '' && confirmRecAcc !== '' && recAcc !== confirmRecAcc) {
      // throw error
      console.log('account number does not match')
    }
  }
  return (
    <Container className={classes.marginspacing}>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='addRecepientDialog'>Add Recepient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following details:
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} align='left' className={classes.marginspacing}>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAdd} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField id='filterCust' align='left' label='Find Recepient' onChange={handleFilterChange} />
          <Button type='submit' align='right' variant='contained' onClick={handleCreate}>Add Recepient</Button>
        </Grid>
      </Grid>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }, { fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container >
  )
}

export default ManageRecepients
