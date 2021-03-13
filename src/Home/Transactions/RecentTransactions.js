import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const RecentTransactions = (props) => {
  // const [recentTransactions, setRecentTransactions] = React.useState([]);

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
  
  const rows = [
    { id: 1, customerID: '1', transactionDate: '03/11/2021', remark: 'Test Payment', type: 'CR', amount:'$3,000' },
    { id: 2, customerID: '2', transactionDate: '03/11/2021', remark: 'Salary', type: 'DR', amount:'$3,000' },
    { id: 3, customerID: '3', transactionDate: '03/11/2021', remark: 'Treat', type: 'Bill', amount:'$3,000' },
    { id: 4, customerID: '4', transactionDate: '03/11/2021', remark: 'Business Funds', type: 'CR', amount:'$3,000' },
    { id: 5, customerID: '5', transactionDate: '03/11/2021', remark: 'Market Funds', type: 'DR', amount:'$3,000' },
  ];
  
  React.useEffect(() => {
    // GetRecentTransactions({customerID: props.customerID}).then(function (response) {
    //   setRecentTransactions(response.recentTransactions);
    // })
    // .catch(function (error) {
    //   setRecentTransactions([]);
    // }); 
  }, []);

  return (
    <div className="RecentTransactions">
      <h3>Recent Transactions</h3>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection={false} hideFooterPagination={true}/>
      </div>
    </div>
  );
}

export default RecentTransactions;