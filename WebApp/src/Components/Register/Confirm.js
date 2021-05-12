import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { List, ListItemText } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ServiceAPI from '../ServiceAPI';


export class Confirm extends Component {

    continue = e => {
        e.preventDefault();

        console.log(this.props)

        const customerDetails = {};
        const details = this.props.values;
        customerDetails.userName = '';
        customerDetails.firstName = details.firstName;
        customerDetails.lastName = details.lastName;
        customerDetails.middleName = details.middleName;
        customerDetails.dateOfBirth = details.dateOfBirth; //pass the date in the format YYYY-MM-DD
        customerDetails.fullAddress = '';
        customerDetails.city = details.city;
        customerDetails.state = details.state;
        customerDetails.country = details.country;
        customerDetails.zipcode = details.zipcode;
        customerDetails.phoneNumber = details.phoneNumber;
        customerDetails.emailId = details.emailId;
        customerDetails.occupation = details.occupation;
        customerDetails.sourceOfIncome = details.sourceOfIncome;
        customerDetails.citizenshipStatus = details.citizenshipStatus;
        customerDetails.countryOfResidence = details.countryOfResidence;
        customerDetails.account = [];
        const accountDetails = {};
        
       
        accountDetails.accNumber = 1;
        accountDetails.coApplicant = '';
        accountDetails.accountType = details.accountType;
        accountDetails.routingNumber = '';
        accountDetails.accountStatus = 'ACTIVE';
        accountDetails.balance = 0;
        customerDetails.account.push(accountDetails);

        // customerDetails.account.push(accountDetails);
        console.log(customerDetails);
        ServiceAPI.addCustomer(customerDetails).then(function (response) {
            console.log('Customer details added successfully')
            ServiceAPI.subscribeCustomerByPhone(customerDetails.phoneNumber).then(function (response) {
                console.log('Customer successfully subscribed');
            }).then(function (response) {
                //to do 
                console.log('to - do')
            }).catch(function (error) {
                console.log(error)
                console.log('Unable to subscribe customer phone number')
            });
        }).then(function (response) {
            this.props.nextStep();
        }).catch(function (error) {
            console.log(error)
            console.log('Unable to add customer details')
        });
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
                    alignitems='flex-start'
                    align='center'>

                    <Grid>
                        <List>

                            <ListItemText primary="FirstName" secondary={values.firstName} />
                            <ListItemText primary="MiddleName" secondary={values.middleName} />

                            <ListItemText primary="LastName" secondary={values.lastName} />

                            <ListItemText primary="Phone Number" secondary={values.phoneNumber} />

                            <ListItemText primary="Email" secondary={values.emailId} />

                            <ListItemText primary="Address" secondary={values.fullAddress} />

                            <ListItemText primary="City" secondary={values.city} />
                            <ListItemText primary="State" secondary={values.state} />
                            <ListItemText primary="Country" secondary={values.country} />


                            <ListItemText primary="Zipcode" secondary={values.zipcode} />
                            <ListItemText primary="Date Of Birth" secondary={values.dateOfBirth} />


                            <ListItemText primary="Country Of Residence" secondary={values.countryOfResidence} />

                            <ListItemText primary="CitizenShipStatus" secondary={values.citizenshipStatus} />


                            <ListItemText primary="Occupation" secondary={values.occupation} />

                            <ListItemText primary="Source Of Income" secondary={values.sourceOfIncome} />


                            <ListItemText primary="Account Type" secondary={values.accountType} />
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
