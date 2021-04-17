import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

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
  { id: 1, transactionDate: '03/11/2021', remark: 'Test Payment', type: 'CR', amount:'$3,000' },
  { id: 2, transactionDate: '03/11/2021', remark: 'Salary', type: 'DR', amount:'$3,000' },
  { id: 3, transactionDate: '03/11/2021', remark: 'Treat', type: 'Bill', amount:'$3,000' },
  { id: 4, transactionDate: '03/11/2021', remark: 'Business Funds', type: 'CR', amount:'$3,000' },
  { id: 5, transactionDate: '03/11/2021', remark: 'Market Funds', type: 'DR', amount:'$3,000' },
];

const AllTransactions = () => {
  return (
    <div className="AllTransactions">
      <h3>View All Transactions</h3>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection={false} components={{Toolbar: GridToolbar}}/>
      </div>
    </div>
  );
}

export default AllTransactions;