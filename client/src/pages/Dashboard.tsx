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
import ClubModal from '../components/modal/club-modal'
import Avatar from '@material-ui/core/Avatar';
import HouseCard from '../components/card/houseCard'
// import TextField from '@material-ui/core/TextField';

interface IScrapeData {
    data: {
        images: Array<string> | string;
        price: string;
        title: string;
    }
}

interface ITreeHouseData {
    images: string[] | string,
    price: string,
    title: string,
    bed: number,
    bath: number,
    location?: string,
    address?: string,
    website?: string,
    description: string,
}

interface IUserData {
    _id: string;
    name: string;
    email: string;
    treeHouses: string[]
}

interface IClub {
    _id: string;
    name: string;
    houses?: [];
    pending?: [];
    users: string[];

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
        marginTop: theme.spacing(1),
        marginBottom: "10px"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        backgroundColor: "#D8F2FF",
        marginLeft: "10px"
    }
}));

function Dashboard(props: any): any {
    let history = useHistory();
    const classes = useStyles();
    const [webLink, setWebLink] = useState("")
    const [addedLink, setAddedLink] = useState(1)
    const [loadedLink, setLoadedLink] = useState(false)
    const [user, setUser] = useState({ _id: "", name: "", email: "", treeHouses: [""] })
    const [club, setClub] = useState<IClub>({ _id: "", name: "", houses: [], pending: [], users: [] })
    const [grove, setGrove] = useState("")
    const [treeHouses, setTreeHouses] = useState([])


    useEffect(() => {
        // console.log("refresh")
        // console.log(addedLink)
        API.dashboard(Auth.getToken())
            .then((res: any) => {
                const userData: IUserData = res.data.user
                setUser({
                    ...user, _id: userData._id, name: userData.name, email: userData.email, treeHouses: userData.treeHouses
                })
                API.getTreeHouses(userData._id)
                    .then((resd: any) => {
                        // console.log(resd)
                        // console.log(!resd.data[0].name)
                        if (resd.data[0].name) {
                            // console.log("hi")
                            setClub(resd.data[0])
                            setTreeHouses(resd.data[0].houses)
                            // console.log(resd.data[0].houses)
                            // console.log(resd.data[0])
                        }
                    })
                    .catch((err: any) => {
                        // console.log(userData._id)
                        // console.log(err)
                    })

            })
            .catch((err: any) => {
                console.log(err)
            })
    }, [addedLink])

    const addTreeHouse = (e: any) => {
        e.preventDefault();
        console.log(user)
        // console.log(name)
        const house = {
            name: grove,
            controller: user._id,

            users: [user._id]
        }
        API.createTreeHouseClub(house)
            .then((res: any) => {
                console.log("completed")
                console.log(res)
                setAddedLink(addedLink*-1)
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">

                <div style={{
                    backgroundColor: "#98c1da",
                    borderRadius: "20px",
                    paddingBottom: "30px",
                    marginTop: "30px",
                }}>
                    {
                        club.name != ""
                            ? <h1>{`Club ${club.name}`}</h1>
                            : <h1>Dashboard</h1>
                    }
                    {
                        club.name != ""
                            ? <LinkModal setAddedLink={setAddedLink} addedLink={addedLink} club={club._id} />
                            : <form id="add-test" className={classes.form} onSubmit={addTreeHouse} noValidate>
                                <p>Start a Grove</p>
                                <TextField id="standard-basic" label="Name" color="secondary" onChange={(event) => { setGrove(event.target.value)}} />
                                <Button
                                    type="submit"

                                    // fullWidth={true}
                                    variant="contained"
                                    // color="primary"
                                    style={{
                                        backgroundColor: "#D8F2FF",
                                        margin: "10px",
                                        padding: "10px",
                                    }}
                                    className={classes.submit}
                                >
                                    +
                        </Button>

                            </form>
                    }
                    {/* <br /> */}



                </div>
                <br></br>

                {/* This is where all the house cards get generated. */}
                <Grid container spacing={2}>
                    {
                        treeHouses === []
                            ? null
                            : treeHouses.map((treeHouse: any, index: number) =>
                                <Grid item xs={6} sm={6} md={4} key={index}>
                                    <HouseCard treeHouse={treeHouse} addedLink={addedLink} setAddedLink={setAddedLink} club={club} />

                                </Grid>
                            )
                    }

                </Grid>
            </Container>
        </ThemeProvider>

    )
}

export default Dashboard;