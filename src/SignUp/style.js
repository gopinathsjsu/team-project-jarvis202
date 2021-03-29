import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    signUp: {
        height: '100vh'
    },
    paper: {
        marginTop: theme.spacing(8, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bank3.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.main,
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(7),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
}));