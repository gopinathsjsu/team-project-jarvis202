import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import ServiceAPI from '../ServiceAPI';
import { useHistory } from 'react-router-dom';

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
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])
  const history = useHistory();

  const columns = [
    // { field: 'id', headerName: 'Transaction ID', width: 180 },
    // { field: 'status', headerName: 'Status', width: 180 },
    { field: 'transactionDate', headerName: 'Date', width: 180, format: (value) => value.toLocaleString('en-US'), },
    { field: 'fromCust', headerName: 'From', width: 180, format: (value) => value.toLocaleString('en-US'), },
    { field: 'toCust', headerName: 'To', width: 180, },
    { field: 'remarks', headerName: 'Remarks', width: 180, },
    { field: 'transactionAmount', headerName: 'Amount ($)', width: 180, },
  ];

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem("custDetails"));

    ServiceAPI.getCustomerDetailsByUserName(sessionDetails.uname).then(function (response) {
      console.log(response)
      const rowData = [];
      var i = 1;
      if (response.data[0].transactions.length > 0) {
        response.data[0].transactions.forEach(function (row) {
          row.id = i;
          row.remarks = row.description;
          row.transactionAmount = row.amount;
          row.toCust = ''; //row.toAccount;
          row.fromCust = ''; //row.fromAccount;
          i++;
          rowData.push(row);
        })
        setRows(rowData);
      }
    })
      .catch(function (error) {
        console.log('Unable to fetch transaction details details', error);
      });
  }, []);


  // function createData(transactionID, status, transactionDate, fromCust, toCust, remarks, transactionAmount) {
  //   return { transactionID, status, transactionDate, fromCust, toCust, remarks, transactionAmount };
  // }

  // // To-Do : update with the real data from the database
  // const rows = [
  //   { id: '12323564', status: 'completed', transactionDate: '12/10/2018', fromCust: 'mamatha', toCust: 'uma', remarks: 'starbucks', transactionAmount: 20 },
  //   { id: '12323565', status: 'completed', transactionDate: '12/10/2018', fromCust: 'mamatha', toCust: 'uma', remarks: 'starbucks', transactionAmount: 20 },
  //   { id: '12323566', status: 'completed', transactionDate: '12/10/2018', fromCust: 'mamatha', toCust: 'uma', remarks: 'starbucks', transactionAmount: 20 },
  //   { id: '12323567', status: 'completed', transactionDate: '12/10/2018', fromCust: 'mamatha', toCust: 'uma', remarks: 'starbucks', transactionAmount: 20 },
  // ]

  // const displayOptions = [
  //   'Last 1 month',
  //   'Last 3 months',
  //   'Last 6 months',
  //   'Last 1 year',
  //   'Custom From and To date'
  // ]

  // const filterOptions = ['Credit', 'Debit']

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // const handleDisplayOptChange = (e) => {
  //   // to-do
  //   console.log(e.target.value)
  //   console.log('Display data based on the option selected')
  // }

  // const handleFilterChange = (e) => {
  //   // to-do
  //   console.log(e.target.value)
  //   console.log('Display data based on the type of the transaction selected')
  // }

  return (
    <Container className={classes.marginspacing}>
      {/* <Grid container spacing={3}>
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
      </Grid> */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid id={Math.random()} rows={rows} columns={columns} checkboxSelection={false} components={{ Toolbar: GridToolbar }} />
      </div>
    </Container>
  )
}

export default TransferActivity
