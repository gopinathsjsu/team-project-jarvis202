import React, { Component } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';



export class FormPersonalDetails extends Component {

    // theme = createMuiTheme({
    //     palette: {
    //         primary: {
    //             main: '#b12a30',
    //         },
    //         secondary: {
    //             main: '#ff4400',
    //             contrastText: '#ffcc00',
    //         },
    //     },
    // });



    render() {

        return (
            // <ThemeProvider theme={theme} >
            <React.Fragment>
                <AppBar >
                    Success
                    </AppBar>
                <h1>Thank you for your Submission</h1>
                <p>You will recive an Email with further Confirmation</p>
            </React.Fragment>
            // </ThemeProvider>
        )
    }
}



export default FormPersonalDetails;
