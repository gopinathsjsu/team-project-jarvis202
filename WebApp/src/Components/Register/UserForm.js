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
    email: '',
    occupation: '',
    address: '',
    ssn: '',
    gender: '',
    city: '',

    nameError: "",
    emailError: "",
    ssnError: "",
    occError: "",
    cityError: "",
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



    render() {

        const { step } = this.state;
        const { firstName, lastName, email, address, city, occupation, ssn, gender, nameError, emailError, ssnError, occError, cityError, addError } = this.state
        const values = { firstName, lastName, email, address, city, occupation, ssn, gender, nameError, emailError, ssnError, occError, cityError, addError }

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