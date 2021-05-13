import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

const AllCustomers = () => {
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])
  const history = useHistory();
  console.log(rows)

  const columns = [
    { field: 'id', headerName: 'Customer ID', width: 50, },
    { field: 'firstName', headerName: 'First Name', width: 180, },
    { field: 'middleName', headerName: 'Middle Name', width: 180 },
    { field: 'accountNumber', headerName: 'Account Number', width: 180},
    { field: 'lastName', headerName: 'Last Name', width: 180, },
    { field: 'userName', headerName: 'User Name', width: 180, },
    { field: 'dateOfBirth', headerName: 'Date Of Birth', width: 180, },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180, },
    { field: 'emailId', headerName: 'EmailID', width: 180, },
  ];

  useEffect(() => {
    ServiceAPI.getAllCustomers().then(function (response) {
      const rowData = [];
      if (response.data.length > 0) {
        response.data.forEach(function (row) {
          let accounts = row.account.map(a => a.accNumber);
          let accountDetails = accounts.join();
          row.id = row.customerId;
          row.accountNumber = accountDetails;
          rowData.push(row);
        })
        setRows(rowData);
      }
    })
      .catch(function (error) {
        console.log('Unable to fetch All customers details', error);
      });
  }, []);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };




  return (
    <div>
      <h4> All Customers</h4>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid id={Math.random()} rows={rows} columns={columns} checkboxSelection={false} components={{ Toolbar: GridToolbar }} />
      </div>
    </div>
  )
}

export default AllCustomers;
