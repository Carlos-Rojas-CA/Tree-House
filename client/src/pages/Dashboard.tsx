import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import theme from '../utils/themeUtil';
import Auth from '../utils/Auth';
import API from '../utils/API';
import Button from '@material-ui/core/Button';
import LinkModal from '../components/modal/linkModal'

interface IScrapeData {
    data: {
        images: Array<string> | string;
        price: string;
        title: string;
    }
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

function Dashboard(props: any): any {
    let history = useHistory();
    const classes = useStyles();
    const [webLink, setWebLink] = useState("")
    const [addedLink, setAddedLink] = useState(1)
    const [loadedLink, setLoadedLink] = useState(false)
    // const classes = useStyles();

useEffect(()=>{
    console.log("refresh")
    console.log(addedLink)
}, [addedLink])






    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <div style={{
                    backgroundColor: "#98c1da",
                    borderRadius: "20px"
                }}>
                    <h1>Dashboard</h1>
                    <LinkModal setAddedLink={setAddedLink} addedLink={addedLink} />
                    <p>Enter a Link</p>
                </div>
            </Container>
        </ThemeProvider>

    )
}

export default Dashboard;