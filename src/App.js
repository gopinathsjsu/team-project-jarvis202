import Home from './Home';
// import Register from './Register';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import SignIn from './SignIn';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import Container from '@material-ui/core/Container';
import awsconfig from './aws-exports';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';
import ConfirmSignUp from './SignUp/ConfirmSignUp';
import './App.css';
import { UserForm } from './Register/UserForm';



Amplify.configure(awsconfig);



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b12a30',
    },
    secondary: {
      main: '#ff4400',
      contrastText: '#ffcc00',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const onIsLoggedIn = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  }

  return (
    <Router >
      <div className="BankingApp">
        {/* <Header isLoggedIn={isLoggedIn} onIsLoggedIn={onIsLoggedIn} /> */}
        <Container maxWidth={false}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path='/' exact component={() => <SignIn onIsLoggedIn={onIsLoggedIn} />} />
              <Route path='/signUp' exact component={SignUp} />
              <Route path='/confirmSignUp/:email' exact component={ConfirmSignUp} />
              <Route path='/register' exact component={UserForm} />
              <Route path='/home' exact component={Home} />
            </Switch>
          </ThemeProvider>
        </Container>
      </div>
    </Router >
  );
}

export default App
