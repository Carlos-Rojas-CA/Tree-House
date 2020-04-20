import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import theme from '../utils/themeUtil';
import Auth from '../utils/Auth';
import API from '../utils/API';

function SignIn(props: any): any {
    let history = useHistory();
    // const classes = useStyles();

    return (
        <h1>SignIn</h1>
    )
}

export default SignIn;