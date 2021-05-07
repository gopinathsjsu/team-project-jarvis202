import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Container from '@material-ui/core/Container';




const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/

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



export class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log("All fields are validated");
            console.log(this.props.values);
            this.props.nextStep();
        } else {
            console.log("Fields are not filled");
            console.log(this.props.values);
            this.setState(initialState);

        }
    };



    validate = () => {
        let nameError = "";
        let emailError = "";
        let ssnError = "";
        let occError = "";
        let cityError = "";
        let addError = "";



        if (!this.props.values.firstName) {
            this.props.values.nameError = "Name is blank";
            nameError = this.props.values.nameError;
        }

        if (!this.props.values.email.includes("@")) {
            this.props.values.emailError = "Email Invalid or blank ";
            emailError = this.props.values.emailError;
        }

        if (!this.props.values.occupation) {
            this.props.values.occError = "Occupation is blank ";
            occError = this.props.values.occError;
        }

        if (!this.props.values.address) {
            this.props.values.addError = "Address is blank ";
            addError = this.props.values.addError;
        }

        if (!this.props.values.city) {
            this.props.values.cityError = "City is blank ";
            cityError = this.props.values.cityError;
        }

        if (!this.props.values.ssn || this.props.values.ssn.length < 4) {
            this.props.values.ssnError = "SSN blank or Length should be greater than 4 ";
            ssnError = this.props.values.ssnError;
        }

        if (emailError || nameError || ssnError || occError || cityError || addError) {
            this.setState({ emailError, nameError, ssnError, occError, cityError, addError });
            return false;
        }

        return true;
    };

    render() {
        const { values, handleChange } = this.props;

        return (
            <React.Fragment>

                <form onSubmit={this.continue}>
                    <AppBar position='static'>
                        <Typography variant='h6' align='center'>
                            User Registration Form
                         </Typography>
                    </AppBar>

                    <Container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        maxWidth="sm"
                        align='center'
                    >
                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                label="FirstName*"
                                onChange={handleChange('firstName')}
                                defaultValue={values.firstName}
                                error={values.nameError !== ""}
                                helperText={values.nameError !== "" ? values.nameError : ""}
                            />
                        </div>

                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                label='LastName*'
                                onChange={handleChange('lastName')}
                                defaultValue={values.lastName}
                                error={values.nameError !== ""}
                                helperText={values.nameError !== "" ? values.nameError : ""}
                            />
                        </div>

                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                padding='normal'
                                label='Email*'
                                onChange={handleChange('email')}
                                defaultValue={values.email}
                                error={values.emailError !== ""}
                                helperText={values.emailError !== "" ? values.emailError : ""}

                            />

                        </div>


                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                label='Address*'
                                onChange={handleChange('address')}
                                defaultValue={values.address}
                                error={values.addError !== ""}
                                helperText={values.addError !== "" ? values.addError : ""}
                            />

                        </div>
                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                label='City*'
                                onChange={handleChange('city')}
                                defaultValue={values.city}
                                error={values.cityError !== ""}
                                helperText={values.cityError !== "" ? values.cityError : ""}
                            />

                        </div>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='Occupation*'
                            onChange={handleChange('occupation')}
                            defaultValue={values.occupation}
                            error={values.occError !== ""}
                            helperText={values.occError !== "" ? values.occError : ""}
                        />

                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                type='number'
                                label="SSN*"
                                inputProps={{ max: 8 }}
                                onChange={handleChange('ssn')}
                                defaultValue={values.ssn.number}
                                error={values.ssnError !== ""}
                                helperText={values.ssnError !== "" ? values.ssnError : ""}

                            />
                        </div>

                        <div>
                            <FormControl variant='outlined' margin='normal' align='left' >
                                <InputLabel >Gender</InputLabel>
                                <Select
                                    onChange={handleChange('gender')}
                                    defaultValue={values.gender}
                                >
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                    <MenuItem value='I do not wish to mention'>I do not wish to mention</MenuItem>

                                </Select>
                            </FormControl>
                        </div>

                        <div>

                            <Button
                                type='submit'
                                variant='contained'
                                justify='center'
                                style={styles.button}
                                onClick={this.continue}>
                                Continue
                            </Button>
                        </div>
                    </Container>
                </form >
            </React.Fragment >

        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails;