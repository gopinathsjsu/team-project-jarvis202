import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails'
import Confirm from './Confirm'
import Success from './Success'
import AppBar from '@material-ui/core/AppBar';

const initialState = {
    step: 1,
    firstName: '',
    middleName: '',
    lastName: '',
    emailId: '',
    occupation: '',
    fullAddress: '',
    phoneNumber: '',
    gender: '',
    city: '',
    accountType: '',
    state: '',
    zipcode: '',
    ssn: '',
    sourceOfIncome: '',
    dateOfBirth: '',
    citizenshipStatus: '',
    countryOfResidence: '',
    country: '',

    nameError: "",
    emailError: "",
    phoneError: "",
    occError: "",
    cityError: "",
    stateError: "",
    zipcodeError: "",
    addError: "",
}


export class UserForm extends Component {
    state = initialState;


    //Proceed to NextStep
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    //Proceed to PreviousStep
    previousStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    //Handle Fields Change- because each input will have its own piece of state & everytime we input that that piece of info changes
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleChangeNumber(event) {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ number: event.target.value })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
        }
    };

    handleCancel = event => {

    }

    render() {

        const { step } = this.state;
        const { firstName, lastName, emailId, fullAddress, city, occupation, phoneNumber, gender, accountType, nameError, emailError, phoneError, occError, cityError, stateError, zipcodeError, addError, ssn,
            sourceOfIncome,
            dateOfBirth,
            citizenshipStatus,
            countryOfResidence,
            country,
            state,
            zipcode
        } = this.state
        const values = {
            firstName, lastName, emailId, fullAddress, city, occupation, phoneNumber, gender, accountType, nameError, emailError, phoneError, occError, cityError, stateError, zipcodeError, addError, ssn, sourceOfIncome,
            dateOfBirth,
            citizenshipStatus,
            countryOfResidence,
            country,
            state,
            zipcode
        }

        switch (step) {
            case 1:
                return (
                    <form onSubmit={this.handleSubmit}>

                        <FormUserDetails
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values}
                            handleSubmit={this.handleSubmit}

                        />
                    </form >
                )

            case 2:
                return <Confirm
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    values={values}
                />

            case 3:
                return < Success />
        }
    }
}

export default UserForm