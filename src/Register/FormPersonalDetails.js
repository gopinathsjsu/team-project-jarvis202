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
        const { values, handleChange } = this.props;
        return (
            // <MuiThemeProvider >
            <React.Fragment>
                <AppBar >
                    Enter Confedential  Details
                    </AppBar>

                <br />
                <br />
                <TextField
                    variant='outlined'
                    margin='normal'
                    type='password'
                    label="SSN"
                    onChange={handleChange('ssn')}
                    defaultValue={values.ssn}
                />

                <br />
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
                    Continue
                    </Button>
            </React.Fragment>
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
