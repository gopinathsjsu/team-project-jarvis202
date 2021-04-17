import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { List, ListItemText } from '@material-ui/core';



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

        return (
            <React.Fragment>
                <Grid container
                    direction='column'
                    justify='center'
                    alignItems='flex-start'>

                    <AppBar title="Enter User Details" >
                        Confirm User Details
                    </AppBar>
                    <br />

                    <Grid>
                        <List>

                            <ListItemText primary="FirstName" secondary={values.firstName} />

                            <ListItemText primary="LastName" secondary={values.lastName} />

                            <ListItemText primary="Email" secondary={values.email} />

                            <ListItemText primary="Address" secondary={values.address} />

                            <ListItemText primary="City" secondary={values.city} />

                            <ListItemText primary="Occupation" secondary={values.occupation} />

                            <ListItemText primary="Gender" secondary={values.gender} />

                        </List>
                    </Grid>
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
                    Confirm & Continue
                    </Button>


            </React.Fragment >

        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPersonalDetails;
