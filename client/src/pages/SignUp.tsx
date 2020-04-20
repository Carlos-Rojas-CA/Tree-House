import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import theme from '../utils/themeUtil';
import Auth from '../utils/Auth'
import API from '../utils/API'
import Alert from '@material-ui/lab/Alert'

interface IUser {
    name: string;
    email: string;
    password: string;
}

function SignUp(props: any): any {
    let history = useHistory()
    const [user, setUser] = useState<IUser>({ name: '', email: '', password: '' })
    const [error, setError] = useState({})

    const updateField = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const processForm = (e: any) => {
        e.preventDefault();
        console.log(user)

        // create a string for an HTTP body message
        //const { email, password } = this.state.user;

        API.signUp(user)
            .then((res: any) => {
                localStorage.setItem('successMessage', res.data.message);
                API.login({ email: user.email, password: user.password }).then((res: any) => {
                    // save the token
                    Auth.authenticateUser(res.data.token);
                    console.log(res)

                    props.toggleAuthStatus()
                    history.push("/dashboard")
                })
            })
            .catch((errors: any) => {
                setError(errors.response.data.errors)
                console.log(errors.response)
                // const errors = response.data.errors ? response.data.errors : {};
                // errors.summary = response.data.message;

                // setError({
                //   errors
                // });
            });





    }
    return(
        <h1>SignUp</h1>
    )


}
export default SignUp;