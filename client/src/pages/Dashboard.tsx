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
    const [user, setUser] = useState({_id: "", name: "", email: "", treeHouses: [""]})
  
    // const classes = useStyles();

useEffect(()=>{
    console.log("refresh")
    console.log(addedLink)
    API.dashboard(Auth.getToken())
      .then((res: any) => {
        setUser({
          ...user, _id: res.data.user._id
        })
        setUser({
          ...user, email: res.data.user.email
        })
        setUser({
          ...user, treeHouses: res.data.user.treeHouses
        })
        console.log(res.data.user._id)
      })
}, [addedLink])

const addTreeHouse = (e:any) => {
    e.preventDefault();
    console.log(user)
    const house = {
        name: "Alpha",
        controller: "5eec803bdb8f1419bc942afd",
        houses: [{
            images: ["https://images.craigslist.org/00000_eskC7QBWsgM_0jm0ew_600x450.jpg", "https://images.craigslist.org/00f0f_3xK6rdyDkFj_0lM0t2_600x450.jpg"],
            price: "$4500",
            description: "testing testing testing",
            
        },],
        users: ["5eec803bdb8f1419bc942afd", "5eec803bdb8f1419bc942afd"]
    }
    API.createTreeHouse(house)
    .then((res:any) => {
        console.log("completed")
        console.log(res)
    })
}




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
                    <form id="add-test" className={classes.form} onSubmit={addTreeHouse} noValidate>
                        
                        <Button
                            type="submit"

                            fullWidth={true}
                            variant="outlined"
                            color="secondary"
                            className={classes.submit}
                        >
                            +
                    </Button>
                    </form>
                </div>
            </Container>
        </ThemeProvider>

    )
}

export default Dashboard;