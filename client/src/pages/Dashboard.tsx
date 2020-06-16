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
    // const classes = useStyles();

    const updateField = (e: any) => {
        setWebLink(e.target.value)
    }



    // Form submit to add website to a card.
    const searchLink = (e: any) => {
        e.preventDefault();
        if (webLink != '') {
            loading();
            API.scrape(webLink)
                .then(({ data }: IScrapeData) => {
                    console.log("before")
                    console.log(data)
                    console.log("after")
                    //create a new card function
                    
                }
                )
        }

    }

    const loading = () => {
        ///this is a loading effect after submitting
        setWebLink("")
        //this is were I create the loading stuff
    }



    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <div style={{
                    backgroundColor: "#98c1da",
                    borderRadius: "20px"
                }}>
                    <h1>Dashboard</h1>
                    <p>Enter a Link</p>
                    <form id="link-form" className={classes.form} onSubmit={searchLink} noValidate>
                        <TextField
                            name="link"
                            margin="dense"
                            variant="standard"
                            style={{ marginRight: "5px" }}
                            required
                            id="link"
                            label="Link-Search"
                            color="secondary"
                            onChange={(event) => { updateField(event) }}
                            value={webLink}
                            autoFocus
                        />
                        <Button
                            type="submit"

                            // fullWidth
                            variant="outlined"
                            color="secondary"
                            className={classes.submit}
                        >
                            Search
                        </Button>
                    </form>

                </div>
            </Container>
        </ThemeProvider>

    )
}

export default Dashboard;