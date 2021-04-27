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

const AllTransactions = (props) => {
  return (
    <div className="AllTransactions">
      <h3>View All Transactions</h3>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={props.transactionDetails} columns={columns} checkboxSelection={false} components={{Toolbar: GridToolbar}}/>
      </div>
    </div>
  );
}

export default AllTransactions;