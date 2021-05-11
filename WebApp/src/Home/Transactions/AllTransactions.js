import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ServiceAPI from '../../Components/ServiceAPI';

const columns = [
  { field: 'id', headerName: 'Transaction ID', width: 150 },
  { field: 'transactionDate', headerName: 'Transaction Date', width: 190 },
  { field: 'remark', headerName: 'Remark', width: 190 },
  {
    field: 'type',
    headerName: 'Transaction Type',
    // type: 'number',
    width: 190,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 190,
    // valueGetter: (params) =>
    //   `${params.getValue('firstName') || ''} ${
    //     params.getValue('lastName') || ''
    //   }`,
  },
];

const AllTransactions = (props) => {
  const [accNo, setAccNo] = React.useState('');
  const [fromAccounts, setFromAccounts] = React.useState([]);

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem('custDetails'));
    if (sessionDetails && sessionDetails.uname) {
      ServiceAPI.getCustomerDetailsByUserName(sessionDetails.uname).then(function (response) {
        const customerAccDetails = response.data[0].account;
        const accn = []
        if (customerAccDetails.length > 0) {
          customerAccDetails.forEach(function (acc) {
            console.log(acc.accountStatus)
            if (acc.accountStatus !== 'CLOSED') {
              accn.push(acc.accNumber.toString())
            }
          });
          setFromAccounts(accn);
        }
        if (accn.length === 0) {
          console.log('You do not have active accounts!')
        }
      })
      .catch(function (error) {
        console.log('Unable to fetch customer details', error);
      });
    }
    
  }, []);

  return (
    <div className="AllTransactions">
      <div className="transactionGridHeader">
      <h3>View All Transactions</h3>
        <Autocomplete
          value={accNo}
          onChange={(event, newValue) => {
            setAccNo(newValue);
          }}
          inputValue={accNo}
          onInputChange={(event, newInputValue) => {
            setAccNo(newInputValue);
          }}
          id='fromAccount'
          options={fromAccounts}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Select Account' variant='outlined' />}
        />
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={props.transactionDetails} columns={columns} checkboxSelection={false} components={{Toolbar: GridToolbar}}/>
      </div>
    </div>
  );
}

export default AllTransactions;