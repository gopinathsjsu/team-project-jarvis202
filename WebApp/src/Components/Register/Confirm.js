import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { List, ListItemText } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export class Confirm extends Component {

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
                <AppBar position='static'>
                    <Typography variant='h6' align='center'>
                        Review Application Details
                         </Typography>
                </AppBar>

                <Container
                    direction='column'
                    justify='center'
                    alignItems='flex-start'
                    align='center'>

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
                    <div>

                        <Typography align='center' variant='subtitle1' color='primary' gutterBottom>
                            By clicking 'Confirm & Continue' you agree that all the information provided is correct
                            to the best of your knowledge.
                        </Typography>
                    </div>


                    <div>
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

                    </div>
                </Container>

            </React.Fragment >

        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default Confirm;
