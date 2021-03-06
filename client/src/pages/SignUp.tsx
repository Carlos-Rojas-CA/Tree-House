import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import theme from '../utils/themeUtil';
import Auth from '../utils/Auth'
import API from '../utils/API'
//import Alert from '@material-ui/lab/Alert'
//import classes from '*.module.css';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert'

interface IUser {
    name: string;
    email: string;
    password: string;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props: any): any {
    let history = useHistory()
    const [user, setUser] = useState<IUser>({ name: '', email: '', password: '' })
    const [error, setError] = useState({email: '', password: '', name: ''})
    const classes = useStyles();
    const updateField = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // CREATE NEW ACCOUNT
    const processForm = (e: any) => {
        e.preventDefault();
        API.signUp(user)
            .then((res: any) => {
                console.log(res)
                //localStorage.setItem('successMessage', res.data.message);
                API.login({ email: user.email, password: user.password }).then((res: any) => {
                    // save the token
                    Auth.authenticateUser(res.data.token);
                    console.log(res)
                    history.push("/dashboard")
                })
            })
            .catch((errors: any) => {
                setError(errors.response.data.errors)
            });
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} >
                <div style={{
                            backgroundColor: "#98c1da", 
                            padding: "10px",
                            borderRadius: "10px",
                            marginTop: "10px"}}>
                    <form className={classes.form} onSubmit={processForm} noValidate>
                        

                        {/* NAME FIELD FOR SIGN UP */}
                            <TextField
                                autoComplete="name"
                                name="name"
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                color="secondary"
                                onChange={(event) => { updateField(event) }}
                                autoFocus
                            />
                            {
                                error.name === 'Please provide your name.'
                                    ? <Alert severity="error">{error.name}</Alert>
                                    : null
                            }
                        
                        {/* EMAIL FIELD FOR SIGN UP */}
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                margin="normal"
                                id="email"
                                label="Email Address"
                                color="secondary"
                                onChange={(event) => { setUser({ ...user, email: event.target.value.trim().toLowerCase() }) }}
                                name="email"
                                autoComplete="email"
                            />
                        
                        {
                            error.email === 'Please provide a correct email address.' || error.email === 'This email is already taken.'
                                ? <Alert severity="error">{error.email}</Alert>
                                : null
                        }
                        
                        {/* PASSWORD FIELD */}
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                color="secondary"
                                onChange={(event) => { updateField(event) }}
                                id="password"
                                autoComplete="current-password"
                            />
                        
                        
                        {
                            error.password === 'Password must have at least 8 characters.'
                                ? <Alert severity="error">{error.password}</Alert>
                                : null
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography style={{paddingTop:"10px"}} color="secondary" variant="body1">Already have an account? <a href="/signin">Sign In!</a></Typography>
                    </div>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>


    )


}
export default SignUp;