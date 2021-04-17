import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import Confirm from './Confirm'
import Success from './Success'

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        address: '',
        ssn: '',
        gender: '',
        city: ''
    }


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


    render() {
        const { step } = this.state;
        const { firstName, lastName, email, address, city, occupation, gender } = this.state
        const values = { firstName, lastName, email, address, city, occupation, gender }

        switch (step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}

                    />
                )
            case 2:
                return <FormPersonalDetails
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    handleChange={this.handleChange}
                    values={values}

                />
            case 3:
                return <Confirm
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    values={values}
                />

            case 4:
                return < Success />
        }
    }
}

export default UserForm
