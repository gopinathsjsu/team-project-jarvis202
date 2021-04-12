import React, { Component } from 'react'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import RaisedButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { List, ListItem, ListItemText } from '@material-ui/core';



export class FormPersonalDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    previous = e => {
        e.preventDefault();
        this.props.previousStep();
    };

    render() {
        const { values } = this.props;
        //{ firstName, lastName, email, occupation, city }
        return (
            // <MuiThemeProvider >
            <React.Fragment>
                <AppBar title="Enter User Details" >
                    Confirm User Details
                    </AppBar>
                <br />
                <br />
                <List>

                    <ListItemText primary="FirstName" secondary={values.firstName} />

                    <ListItemText primary="LastName" secondary={values.lastName} />

                    <ListItemText primary="Email" secondary={values.email} />

                    <ListItemText primary="Address" secondary={values.address} />

                    <ListItemText primary="City" secondary={values.city} />

                    <ListItemText primary="Occupation" secondary={values.occupation} />

                    <ListItemText primary="Gender" secondary={values.gender} />



                </List>

                <Button
                    type='submit'
                    variant='contained'
                    style={styles.button}
                    onClick={this.previous} >
                    Back
                    </Button>


                <Button
                    type='submit'
                    variant='contained'
                    style={styles.button}
                    onClick={this.continue} >
                    Confirm & Continue
                    </Button>
            </React.Fragment >
            // </MuiThemeProvider >
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPersonalDetails;
