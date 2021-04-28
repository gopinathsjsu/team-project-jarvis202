import React from 'react';
import clsx from 'clsx';
import { Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItems from './ListItems';
import Transactions from './Transactions';
import AddAccount from '../Components/AddAccount';
import CloseAccount from '../Components/CloseAccount';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import MuiAlert from '@material-ui/lab/Alert';
import MakeTransfer from '../Components/MakeTransfer';
import TransferActivity from '../Components/TransferActivity';
import ManageRecepients from '../Components/ManageRecepients';
import AddRecepient from '../Components/AddRecepient';
import ValidateOTP from '../Components/ValidateOTP';
import AllCustomers from '../Components/AllCustomers';
import MakeTransaction from '../Components/MakeTransaction';
import CustomerTransactions from '../Components/CustomerTransactions';
import CustomerAccounts from '../Components/CustomerAccounts';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: theme.spacing(8),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      Auth.signOut();
      // sessionStorage.clear();
      // to-do  : props.onIsLoggedIn(false); GIVING ERROR PROPS.ONISLOGGEDIN IS NOT A FUNCTION
      // navigate to the sign in page
      history.push('/');
    }
    catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
              Banking App
            </Typography>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button type='submit' color='inherit' onClick={handleSave}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List><ListItems /></List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <Route exact path='/home' component={() => <Transactions />} />
          <Route exact path='/addAccount' component={() => <AddAccount />} />
          <Route exact path='/closeAccount' component={() => <CloseAccount />} />
          <Route exact path='/makeTransfer' component={() => <MakeTransfer />} />
          <Route exact path='/transferActivity' component={() => <TransferActivity />} />
          <Route exact path='/manageRecepients' component={() => <ManageRecepients />} />
          <Route exact path='/addRecepient' component={() => <AddRecepient />} />
          <Route exact path='/validateOTP/:varDetails' component={() => <ValidateOTP />} />
          <Route exact path='/allCustomers' component={() => <AllCustomers />} />
          <Route exact path='/makeTransaction' component={() => <MakeTransaction />} />
          <Route exact path='/customerAccounts' component={() => CustomerAccounts} />
          <Route exact path='/customerTransactions' component={() => CustomerTransactions} />
          <div className={classes.appBarSpacer} />
        </main>
      </div>
    </Router >
  );
}
