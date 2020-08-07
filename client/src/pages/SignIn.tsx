import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import theme from '../utils/themeUtil';
import Auth from '../utils/Auth';
import API from '../utils/API';

interface IUser {
    email: string;
    password: string;
}

const useStyles = makeStyles((theme: Theme) => {
    createStyles({
        signInBlock: {
            backgroundColor: "white"
        }
    })
})

// const useStyles = makeStyles((theme: Theme))

function SignIn(props: any): any {
    let history = useHistory();
    const classes = useStyles();
    const [user, setUser] = useState<IUser>({ email: '', password: '' })
    const [error, setError] = useState({})


    const updateField = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const processForm = (e: any) => {
        e.preventDefault();
        API.login(user)
            .then((res: any) => {
                Auth.authenticateUser(res.data.token)
                props.toggleAuthStatus()
                history.push("/dashboard")
            })
            .catch((errors: any) => {
                setError(errors.response.data.errors)
                console.log(errors.response)
            })
    }


    // const classes = useStyles();

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item sm={false} md={6} >

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} >
                        <div style={{
                            backgroundColor: "#98c1da", 
                            padding: "10px",
                            borderRadius: "10px",
                            // border: "2px solid #44d362",
                            marginTop: "10px"}}>
                        <form onSubmit={processForm} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                color="secondary"
                                onChange={(event) => { setUser({ ...user, email: event.target.value.trim().toLowerCase() }) }}
                                // errorText={error.email}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                color="secondary"
                                onChange={(event) => { updateField(event) }}
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            
                        >
                            Sign In
                        </Button>
                        </form>
                        <Typography style={{paddingTop:"10px"}} color="secondary" variant="body1">New to Tree house? <a href="/signup">Sign Up!</a></Typography>
                        
                        </div>
                    </Grid>

                </Grid>
                {/* <h1>SignIn</h1> */}
            </Container>
        </ThemeProvider>

    )
}

export default SignIn;