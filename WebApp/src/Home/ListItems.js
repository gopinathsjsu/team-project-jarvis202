import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MoneyIcon from '@material-ui/icons/Money';
import PaymentIcon from '@material-ui/icons/Payment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
}));

const ListItems = () => {
  const classes = useStyles();
  const [openMA, setOpenMA] = React.useState(false);
  const [openTF, setOpenTF] = React.useState(false);

  const handleClickMA = () => {
    setOpenMA(!openMA);
  };

  const handleClickTF = () => {
    setOpenTF(!openTF);
  };

  return (
    <div>
      <Link to='/' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
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
            <ListItemText primary='Add Account' />
          </ListItem>
        </Link>
        <Link to='closeAccount' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
          <ListItem button className={classes.nested}>
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
        <Link to='manageRecepients' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Manage Receipents' />
          </ListItem>
        </Link>
        <Link to='makeTransfer' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Transfer Funds' />
          </ListItem>
        </Link>
        <Link to='transferActivity' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Transfer Activity' />
          </ListItem>
        </Link>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary='Pay Bills' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary='Admin Dashboard' />
      </ListItem>
    </div>
  )
}
export default ListItems
