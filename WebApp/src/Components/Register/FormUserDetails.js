import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



export class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
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

                    <AppBar title="Enter Personal Details" >
                        Enter Personal Details
                    </AppBar>

                    <br />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        label="First Name"
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                    />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='LastName'
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                    />


                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Email'
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                    />


                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Address'
                        onChange={handleChange('address')}
                        defaultValue={values.address}
                    />


                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='City'
                        onChange={handleChange('city')}
                        defaultValue={values.city}
                    />


                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Occupation'
                        onChange={handleChange('occupation')}
                        defaultValue={values.occupation}
                    />


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


                </Grid>
                <Button
                    type='submit'
                    variant='contained'
                    justify='center'
                    style={styles.button}
                    onClick={this.continue} >
                    Continue
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

export default FormUserDetails;
