import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddBox from '@material-ui/icons/AddBox';
import PaymentIcon from '@material-ui/icons/Payment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
}));

const ListItems = () => {
  const classes = useStyles();
  const [openMA, setOpenMA] = React.useState(false);
  const [openTF, setOpenTF] = React.useState(false);
  const [username, setusername] = React.useState(JSON.parse(sessionStorage.getItem('custDetails')).uname);
  console.log(username)

  const handleClickMA = () => {
    setOpenMA(!openMA);
  };

  const handleClickTF = () => {
    setOpenTF(!openTF);
  };
  function PanelLayout() {
    if (username === 'admin') {
      return (
        <div>
          <Link to='/' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary='Admin Dashboard' />
            </ListItem>
          </Link>
          <Link to='allCustomers' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary='Customers' />
            </ListItem>
          </Link>
          <Link to='makeTransaction' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary='Make Transaction' />
            </ListItem>
          </Link>
        </div >
      );
    }
    else {
      return (
        <div>
          <Link to='/home' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary='My Transactions' />
            </ListItem>
          </Link>
          <ListItem button onClick={handleClickMA}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary='Manage Account' />
            {/* {openMA ? <ExpandMore /> : <ExpandLess />} */}
          </ListItem>
          <Collapse in={openMA} timeout='auto' unmountOnExit>
            <Link to='addAccount' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon><AddBoxIcon /></ListItemIcon>
                <ListItemText primary='Add Account' />
              </ListItem>
            </Link>
            <Link to='closeAccount' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon><CancelPresentationIcon /></ListItemIcon>
                <ListItemText primary='Close Account' />
              </ListItem>
            </Link>
          </Collapse>
          <ListItem button onClick={handleClickTF}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary='Transfer Money' />
            {/* {openMA ? <ExpandMore /> : <ExpandLess />} */}
          </ListItem>
          <Collapse in={openTF} timeout='auto' unmountOnExit>
            <Link to='manageRecepients' key='TF1' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Manage Receipents' />
              </ListItem>
            </Link>
            <Link to='makeTransfer' kye='TF2' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Transfer Funds' />
              </ListItem>
            </Link>
            <Link to='transferActivity' key='TF3' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Transfer Activity' />
              </ListItem>
            </Link>
          </Collapse>
          <Link to='payBills' kye='TF2' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary='Pay Bills' />
            </ListItem>
          </Link>
          <Link to='addRecepient' key='TF1' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary='Add Recepient' />
              </ListItem>
          </Link>
          <Link to='recurPayments' key='TF1' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <ListItemText primary='Recurring Payments' />
            </ListItem>
          </Link>
        </div>
      )
    }
  }

  return (
    <PanelLayout />

  )
}
export default ListItems
