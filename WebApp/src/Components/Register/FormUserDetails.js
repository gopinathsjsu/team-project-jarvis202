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
import { withStyles } from "@material-ui/core/styles";

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
    state: '',
    zipcode: '',
    ssn: '',
    sourceOfIncome: '',
    dateOfBirth: '',
    citizenshipStatus: '',
    resident: '',
    country: '',


    nameError: "",
    emailError: "",
    phoneError: "",
    accountTypeError: "",
    occError: "",
    cityError: "",
    stateError: "",
    zipcodeError: "",
    addError: "",

}

const styles = theme => ({
    button: {
        margin: theme.spacing(1)

    },

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    }
});

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
        let phoneError = "";
        let accountTypeError = "";
        // let occError = "";
        // let cityError = "";
        // let addError = "";
        // let stateError = "";
        // let zipcodeError = "";



        if (!this.props.values.firstName) {
            this.props.values.nameError = "Name is blank";
            nameError = this.props.values.nameError;
        }

        if (!this.props.values.emailId.includes("@")) {
            this.props.values.emailError = "Email Invalid or blank ";
            emailError = this.props.values.emailError;
        }

        // if (!this.props.values.occupation) {
        //     this.props.values.occError = "Occupation is blank ";
        //     occError = this.props.values.occError;
        // }

        // if (!this.props.values.address) {
        //     this.props.values.addError = "Address is blank ";
        //     addError = this.props.values.addError;
        // }

        // if (!this.props.values.city) {
        //     this.props.values.cityError = "City is blank ";
        //     cityError = this.props.values.cityError;
        // }

        // if (!this.props.values.state) {
        //     this.props.values.stateError = "State is blank ";
        //     stateError = this.props.values.stateError;
        // }

        // if (!this.props.values.zipcode) {
        //     this.props.values.zipcodeError = "Zipcode is Blank ";
        //     zipcodeError = this.props.values.zipcodeError;
        // }

        if (!this.props.values.phoneNumber || this.props.values.phoneNumber.length < 10 || this.props.values.phoneNumber.length > 10) {
            this.props.values.phoneError = "Phone Number is not valid ";
            phoneError = this.props.values.phoneError;
        }

        // if (emailError || nameError || phoneError || occError || cityError || stateError || zipcodeError || addError) {
        //     this.setState({ emailError, nameError, phoneError, occError, cityError, stateError, zipcodeError, addError });
        //     return false;
        // }
        if (!this.props.values.accountType) {
            this.props.values.accountTypeError = "AccountType not selected";
            accountTypeError = this.props.values.accountTypeError;
        }


        if (emailError || nameError || phoneError || accountTypeError) {
            this.setState({ emailError, nameError, phoneError, accountTypeError });
            return false;
        }
        return true;
    };

    render() {
        const { values, handleChange, classes } = this.props;

        return (
            <React.Fragment>

                <AppBar position='static'>
                    <Typography variant='h6' align='center'>
                        User Registration Form
                         </Typography>
                </AppBar>
                <form className={classes.root}>

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

                        <TextField
                            variant='outlined'
                            margin='normal'
                            label="MiddleName"
                            onChange={handleChange('middleName')}
                            defaultValue={values.middleName}
                        // error={values.nameError !== ""}
                        // helperText={values.nameError !== "" ? values.nameError : ""}
                        />

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
                            type='number'
                            label="Phone Number*"
                            // inputProps={{ max: 8 }}
                            onChange={handleChange('phoneNumber')}
                            defaultValue={values.phoneNumber.number}
                            error={values.phoneError !== ""}
                            helperText={values.phoneError !== "" ? values.phoneError : ""}

                        />


                        <TextField
                            variant='outlined'
                            margin='normal'
                            padding='normal'
                            label='Email*'
                            onChange={handleChange('emailId')}
                            defaultValue={values.emailId}
                            error={values.emailError !== ""}
                            helperText={values.emailError !== "" ? values.emailError : ""}

                        />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            type='number'
                            label="SSN"
                            // inputProps={{ max: 8 }}
                            onChange={handleChange('ssn')}
                            defaultValue={values.ssn.number}
                        // error={values.phoneError !== ""}
                        // helperText={values.phoneError !== "" ? values.phoneError : ""}

                        />

                    </div>


                    <div>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='Address'
                            onChange={handleChange('fullAddress')}
                            defaultValue={values.fullAddress}
                        // error={values.addError !== ""}
                        // helperText={values.addError !== "" ? values.addError : ""}
                        />


                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='City'
                            onChange={handleChange('city')}
                            defaultValue={values.city}
                        // error={values.cityError !== ""}
                        // helperText={values.cityError !== "" ? values.cityError : ""}
                        />



                        <TextField
                            variant='outlined'
                            margin='normal'
                            padding='normal'
                            label='State'
                            onChange={handleChange('state')}
                            defaultValue={values.state}

                        />
                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                padding='normal'
                                label='Country'
                                onChange={handleChange('country')}
                                defaultValue={values.country}

                            />
                            <TextField
                                variant='outlined'
                                margin='normal'
                                type='number'
                                label="Zipcode"
                                onChange={handleChange('zipcode')}
                                defaultValue={values.zipcode}

                            />

                            <TextField
                                variant='outlined'
                                margin='normal'
                                type='date'
                                format='yyyy/mm/dd'
                                // label="Date Of Birth*"
                                onChange={handleChange('dateOfBirth')}
                                defaultValue={values.dateOfBirth}
                                helperText='Date Of Birth'

                            />

                        </div>
                        <div>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                label='Country Of Residence'
                                onChange={handleChange('countryOfResidence')}
                                defaultValue={values.countryOfResidence}

                            />

                            <TextField
                                variant='outlined'
                                margin='normal'
                                label="Citizenship Status"
                                onChange={handleChange('citizenshipStatus')}
                                defaultValue={values.citizenshipStatus}

                            />
                        </div>

                    </div>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Occupation'
                        onChange={handleChange('occupation')}
                        defaultValue={values.occupation}
                    // error={values.occError !== ""}
                    // helperText={values.occError !== "" ? values.occError : ""}
                    />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Source Of Income*'
                        onChange={handleChange('sourceOfIncome')}
                        defaultValue={values.sourceOfIncome}
                    // error={values.sourceOfIncome !== ""}
                    // helperText={values.sourceOfIncome !== "" ? values.sourceOfIncome : ""}
                    />



                    <div>
                        <FormControl variant='outlined' margin='normal'>
                            <InputLabel >Account Type **</InputLabel>
                            <Select
                                onChange={handleChange('accountType')}
                                defaultValue={values.accountType}
                                style={{ width: 220 }}
                                error={values.accountTypeError !== ""}
                                helperText={values.accountTypeError !== "" ? values.accountTypeError : ""}

                            >
                                <MenuItem value='Checking Account'>Checking Account</MenuItem>
                                <MenuItem value='Savings Account'>Savings Account</MenuItem>

                            </Select>

                        </FormControl>

                    </div>
                    <div>
                        <FormControl variant='outlined' margin='normal' >
                            <InputLabel >Gender</InputLabel>
                            <Select
                                onChange={handleChange('gender')}
                                defaultValue={values.gender}
                                style={{ width: 220 }}
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

                </form >
            </React.Fragment >

        )
    }
}



export default withStyles(styles, { withTheme: true })(FormUserDetails);