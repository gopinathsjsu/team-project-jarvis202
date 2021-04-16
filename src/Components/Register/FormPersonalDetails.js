import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';




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

            <React.Fragment>

                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                >
                    <AppBar >
                        Enter Confidential  Details
                    </AppBar>

                    <br />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        type='password'
                        label="SSN"
                        onChange={handleChange('ssn')}
                        defaultValue={values.ssn}
                    />

                </Grid>

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

        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPersonalDetails;
