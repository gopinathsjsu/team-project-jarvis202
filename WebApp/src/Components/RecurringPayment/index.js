import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom';
import ServiceAPI from '.././ServiceAPI';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

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

const RecurringPayment = () => {
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])
  const history = useHistory();

  const columns = [
    // { field: 'id', headerName: 'Id', width: 180 },
    { field: 'transDate', headerName: 'Set-up Date', width: 180, },
    { field: 'nextTransactionDate', headerName: 'Next Payment', width: 180, format: (value) => value.toLocaleString('en-US')},
    { field: 'fromAccount', headerName: 'From Number', width: 180 },
    { field: 'toAccount', headerName: 'To Account', width: 180, },
    { field: 'amount', headerName: 'Amount', width: 180, },
    { field: 'description', headerName: 'Remarks', width: 180, },
  ];

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem("custDetails"));
    console.log(sessionDetails.uname)
    ServiceAPI.getCustomerDetailsByUserName(sessionDetails.uname).then(function (response) {
      console.log(response)
      ServiceAPI.getJobsOfCustomer(response.data[0].customerId).then(function (response) {
        console.log(response)
        const rowData = [];
        if (response.data.length > 0) {
          response.data.forEach(function (row) {
            row.id = row.jobId;
            rowData.push(row);
          })
          setRows(rowData);
        }
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
    })
  }, []);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Container className={classes.marginspacing}>
      <div>
        <h4> All Recurring Payments</h4>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} checkboxSelection={false} components={{ Toolbar: GridToolbar }} />
        </div>
      </div>
    </Container >
  )
}

export default RecurringPayment;
