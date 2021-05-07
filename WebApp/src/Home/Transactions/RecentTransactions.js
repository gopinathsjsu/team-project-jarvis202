import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const RecentTransactions = (props) => {

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

  return (
    <div className="RecentTransactions">
      <h3>Recent Transactions</h3>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid rows={props.recentTransactionDetails} columns={columns} checkboxSelection={false} hideFooterPagination={true}/>
      </div>
    </div>
  );
}

export default RecentTransactions;