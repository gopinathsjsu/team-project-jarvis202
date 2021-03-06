
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style'
import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from '../aws-exports';
import { useHistory, useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ServiceAPI from '../Components/ServiceAPI';



// Amplify.configure(awsconfig)

const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SignIn = (props) => {
    const classes = useStyles();
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const location = useLocation();

    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await Auth.signIn(username, password);
            sessionStorage.setItem('custDetails', JSON.stringify({ uname: username }))
            console.log(user);
            console.log('user signedIn');
            //const path = '/';
            history.push('/home');
            props.onIsLoggedIn(true);

        } catch (error) {
            setErrorMessage(error.message);
            console.log(errorMessage);
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container component='main' className={classes.signIn}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Snackbar open={open} autoHideDuration={60000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity='error'>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='username'
                            label='Username'
                            name='username'
                            autoComplete='username'
                            autoFocus
                            onChange={(e, username) => setUserName(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            onChange={(e, password) => setPassword(e.target.value)}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            // color='secondary'
                            className={classes.submit}
                            onClick={login}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid> */}
                            <Grid container justify='flex-end'>
                                <Grid item>
                                    <Link to='register' variant='body2'>
                                        {"Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
export default SignIn;
