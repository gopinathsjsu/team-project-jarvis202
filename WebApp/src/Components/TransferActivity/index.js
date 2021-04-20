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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'

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

const TransferActivity = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const columns = [
    { id: 'transactionID', label: 'Transaction ID', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'transactionDate', label: 'Date', minWidth: 120, format: (value) => value.toLocaleString('en-US'), },
    { id: 'fromCust', label: 'From', minWidth: 120, format: (value) => value.toLocaleString('en-US'), },
    { id: 'toCust', label: 'To', minWidth: 120, },
    { id: 'remarks', label: 'Remarks', minWidth: 120, },
    { id: 'transactionAmount', label: 'Amount ($)', minWidth: 120, },
  ];


  function createData(transactionID, status, transactionDate, fromCust, toCust, remarks, transactionAmount) {
    return { transactionID, status, transactionDate, fromCust, toCust, remarks, transactionAmount };
  }

  // To-Do : update with the real data from the database
  const rows = [
    createData('12323564', 'completed', '12/10/2018', 'mamatha', 'uma', 'starbucks', 20),
    createData('12323565', 'completed', '12/11/2018', 'uma', 'srujana', 'party', 50),
    createData('12323566', 'completed', '1/9/2019', 'srujana', 'prajakta', 'funds transfer', 100),
    createData('12323567', 'pending', '2/10/2019', 'prajakta', 'srujana', 'funds transfer', 100),
  ]

  const displayOptions = [
    'Last 1 month',
    'Last 3 months',
    'Last 6 months',
    'Last 1 year',
    'Custom From and To date'
  ]

  const filterOptions = ['Credit', 'Debit']

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDisplayOptChange = (e) => {
    // to-do
    console.log(e.target.value)
    console.log("Display data based on the option selected")
  }

  const handleFilterChange = (e) => {
    // to-do
    console.log(e.target.value)
    console.log("Display data based on the type of the transaction selected")
  }

  return (
    <Container className={classes.marginspacing}>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Autocomplete
            id='displayOpt'
            options={displayOptions}
            style={{ width: 300 }}
            onChange={handleDisplayOptChange}
            renderInput={(params) => <TextField {...params} label='Show Transfers for' variant='outlined' />}
          />
          <Autocomplete
            id='filterOpt'
            options={filterOptions}
            style={{ width: 300 }}
            onChange={handleFilterChange}
            renderInput={(params) => <TextField {...params} label='Filter' variant='outlined' />}
          />
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
    </Container>
  )
}

export default TransferActivity
