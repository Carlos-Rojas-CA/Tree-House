import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import MenuAppBar from './components/app-bar/app-bar'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, Redirect, Link, useHistory } from "react-router-dom";
import Auth from './utils/Auth';
import {
  PrivateRoute
} from './Routes';
//import { useHistory } from "react-router-dom";
import theme from './utils/themeUtil';
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Error from './pages/Error'
import './App.css';
//import e from 'express';
import API from './utils/API';


interface IUser {
  name?: string;
  email: string;
  password: string;
}

function App() {
  // let history = useHistory()
  // Setting our component's initial state
  const [authenticated, setAuthenticated] = useState(false)
  //const [user, setUser] = useState<IUser>({name: '', email: '', password: ''})
  
  //const [formObject, setFormObject] = useState({})
  

  // Toggles if the user is authenticated.
  useEffect(() => {
    toggleAuthStatus()
  }, [])

  const toggleAuthStatus = () => {
    setAuthenticated(Auth.isUserAuthenticated())
  };



  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <MenuAppBar toggleAuthStatus={toggleAuthStatus} authenticated={authenticated}/>
          <header className="App-header">
            {/* <br/> */}
            {/* <Link to='/signup'>Signup</Link> */}
            <Switch>
              <Route exact path='/error' component={() => (<Error toggleAuthStatus={toggleAuthStatus} />)} />
              <Route exact path='/' component={()=> (authenticated
                ? <Redirect to="/dashboard" />
                : <SignIn toggleAuthStatus={toggleAuthStatus} />)} >
              </Route>
              <Route exact path='/signin' component={() => (<SignIn toggleAuthStatus={toggleAuthStatus} />)} />
              <Route exact path='/signup' component={() => (<SignUp toggleAuthStatus={toggleAuthStatus} />)} />
              <PrivateRoute exact path="/dashboard" component={() => <Dashboard toggleAuthStatus={toggleAuthStatus} />} />

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
