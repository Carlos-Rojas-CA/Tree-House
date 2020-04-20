import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import MenuAppBar from './components/app-bar/app-bar'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, Redirect, Link } from "react-router-dom";
import Auth from './utils/Auth';
import {
  PrivateRoute
} from './Routes';
import theme from './utils/themeUtil';
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Error from './pages/Error'
import './App.css';

function App() {

  // Setting our component's initial state
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState('')
  //const [formObject, setFormObject] = useState({})

  // Toggles if the user is authenticated.
  useEffect(() => {
    toggleAuthStatus()
  }, [])

  function toggleAuthStatus() {
    setAuthenticated(Auth.isUserAuthenticated())
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <MenuAppBar />
          <header className="App-header">
            <Link to='/signup'>Signup</Link>
            <Switch>
              <Route exact path='/signup' component={() => (<SignUp toggleAuthStatus={toggleAuthStatus} />)} />
              <Route exact path='/error' component={() => (<Error toggleAuthStatus={toggleAuthStatus} />)} />
              <Route exact path='/' component={() => (<SignIn toggleAuthStatus={toggleAuthStatus} />)} />
              <Route exact path='/signin' component={() => (<SignIn toggleAuthStatus={toggleAuthStatus} />)} />
              <PrivateRoute exact path="/dashboard" component={() => <Dashboard toggleAuthStatus={toggleAuthStatus} user={user} />} />

            </Switch>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
        </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
        </a>
          </header>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
