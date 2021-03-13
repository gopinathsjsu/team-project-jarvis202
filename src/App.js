import Home from './Home';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';
import AddAccount from './Components/AddAccount';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b12a30',
    },
    secondary: {
      main: '#e9e9e9',
    },
  },
});

function App() {
  return (
    <div className="BankingApp">
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>

    </div>
  );
}

export default App;
