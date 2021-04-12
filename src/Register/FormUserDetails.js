import React, { Component } from 'react'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';



export class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            // <MuiThemeProvider >
            <React.Fragment>

                <form>
                    <Typography>
                        <AppBar title="Enter User Personal Details" >
                            <h3 >Enter User Personal Details </h3>
                        </AppBar>
                        <br />
                        <br />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            label="First Name"
                            onChange={handleChange('firstName')}
                            defaultValue={values.firstName}
                        />

                        <br />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='LastName'
                            onChange={handleChange('lastName')}
                            defaultValue={values.lastName}
                        />
                        <br />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='Email'
                            onChange={handleChange('email')}
                            defaultValue={values.email}
                        />
                        <br />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='Address'
                            onChange={handleChange('address')}
                            defaultValue={values.address}
                        />
                        <br />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='City'
                            onChange={handleChange('city')}
                            defaultValue={values.city}
                        />
                        <br />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            label='Occupation'
                            onChange={handleChange('occupation')}
                            defaultValue={values.occupation}
                        />
                        <br />


                        <br />
                        <FormControl variant='outlined'>
                            <InputLabel > Gender</InputLabel>
                            <Select
                                onChange={handleChange('gender')}
                                defaultValue={values.gender}
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <br />

                        <Button
                            type='submit'
                            variant='contained'
                            style={styles.button}
                            onClick={this.continue} >
                            Continue
                    </Button>
                    </Typography>
                </form>
            </React.Fragment>
            // </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails;
