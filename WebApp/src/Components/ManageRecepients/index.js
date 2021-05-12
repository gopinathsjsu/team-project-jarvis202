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

const ManageRecepients = () => {
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])
  const history = useHistory();

  const columns = [
    { field: 'id', headerName: 'Id', width: 180 },
    { field: 'firstName', headerName: 'First Name', width: 180, },
    { field: 'lastName', headerName: 'Last Name', width: 180, },
    { field: 'nickName', headerName: 'Nick Name', width: 180 },
    { field: 'accountNum', headerName: 'Account Number', width: 180 },
    { field: 'zipCode', headerName: 'ZipCode', width: 180, },
  ];

  useEffect(() => {
    var sessionDetails = JSON.parse(sessionStorage.getItem("custDetails"));

    ServiceAPI.getRecepientsByCustId(sessionDetails.uname).then(function (response) {
      // console.log(response)
      const rowData = [];
      if (response.data.length > 0) {
        response.data.forEach(function (row) {
          row.id = row.recepientId;
          rowData.push(row);
        })
        setRows(rowData);
      }
    })
      .catch(function (error) {
        console.log('Unable to fetch customer contact details', error);
      });
  }, []);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleAddRecepient = () => {
    history.push('addRecepient');
  }

  return (
    <Container className={classes.marginspacing}>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button type='submit' align='right' variant='contained' onClick={handleAddRecepient}>Add Account</Button>
        </Grid>
      </Grid>
      <div>
        <h4> All Customers</h4>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid id={Math.random()} rows={rows} columns={columns} checkboxSelection={false} components={{ Toolbar: GridToolbar }} />
        </div>
      </div>
    </Container >
  )
}

export default ManageRecepients
