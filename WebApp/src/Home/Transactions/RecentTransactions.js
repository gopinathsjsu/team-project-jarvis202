import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ServiceAPI from '../../Components/ServiceAPI';

const RecentTransactions = (props) => {
  const [accNo, setAccNo] = React.useState('');
  const [fromAccounts, setFromAccounts] = React.useState([]);
  const [rows, setRows] = React.useState(props.recentTransactionDetails);

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

  useEffect(() => {
    setRows(props.recentTransactionDetails);
  }, [props.recentTransactionDetails]);

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

  const onAccountSelected = (accNum) => {
    ServiceAPI.getTansByAccountId(parseInt(accNum)).then(function (response) {
      const selectedAccountDetails = response.data && response.data ? response.data : [];

      const allTransactions = [];
      selectedAccountDetails.forEach(transaction => {
          let rowDetails = {};
          rowDetails.id = transaction.transactionId;
          rowDetails.remark = transaction.description;
          rowDetails.amount = transaction.amount;
          rowDetails.type = transaction.transactionType;
          rowDetails.transactionDate = transaction.transactionDate;
          allTransactions.push(rowDetails);
      });
      const recentTransactions = allTransactions.sort().slice(0, 5);
      setRows(recentTransactions);

    });
  }

  return (
    <div className="RecentTransactions">
      <div className="transactionGridHeader">
        <h3>Recent Transactions</h3>
        <Autocomplete
          value={accNo}
          onChange={(event, newValue) => onAccountSelected(newValue)}
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
      
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection={false} hideFooterPagination={true}/>
      </div>
    </div>
  );
}

export default RecentTransactions;