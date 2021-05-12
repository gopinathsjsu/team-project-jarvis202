import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function Success() {

    return (
        <React.Fragment>
            <AppBar position='static'>
                <Typography variant='h6' align='center'>
                    Success
                         </Typography>
            </AppBar>
            <Container>
                <h1>Thank you for your Submission</h1>
                <p>You will receive an Email with further Confirmation</p>
            </Container>
        </React.Fragment>
    );
}






