import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useHistory, Link } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Amplify, { Auth } from 'aws-amplify';


export default function Success(props) {
    const history = useHistory();
    const [email, setEmail] = React.useState(props.values.emailId);
    
    const handleSubmit = async () => {
        const username = props.values.emailId.substring(0, props.values.emailId.indexOf('@'));;
        const password = username + '@123';
        const phoneNumber = props.values.phoneNumber;
        try {
            const dataEmail = {
                Name: 'email',
                Value: email
            };
            const dataName = {
                Name: 'preferred_username',
                Value: username
            };

            const attributes = [new CognitoUserAttribute(dataEmail), new CognitoUserAttribute(dataName)];

            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                },
            });
            console.log(user);
            var uDetails = {};
            uDetails.username = username;
            uDetails.password = password;
            uDetails.phoneNumber = phoneNumber;
            uDetails.emailid = email;
            const path = '/confirmSignUp/:' + uDetails;


            history.push({
                pathname: path,
                state: { details : uDetails }
            })
        } catch (error) {
            // setErrorMessage(error.message);
            console.log(error);
            // setOpen(true);
        }
    }
    return (
    <React.Fragment>
        <AppBar position='static'>
            <Typography variant='h6' align='center'>
                Success
            </Typography>
        </AppBar>
        <Container>
            <h1>Thank you for your Submission</h1>
            <p>You will receive an Email with a verificationCode, Please confirm it</p>
            <Button type='submit' variant='contained' onClick ={handleSubmit}>Ok</Button>
        </Container>
    </React.Fragment>
    );
}






