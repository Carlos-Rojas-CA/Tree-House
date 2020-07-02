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

interface IScrapeData {
    data: {
        images: Array<string> | string;
        price: string;
        title: string;
    }
}

interface ITreeHouseData {
    images: string[]|string,
    price: string,
    title: string,
    bed: number,
    bath: number,
    location?: string,
    address?: string,
    website?: string,
    // description: string,
 }

interface IUserData {
    _id: string;
    name: string;
    email: string;
    treeHouses: string[]
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
    const [user, setUser] = useState({ _id: "", name: "", email: "", treeHouses: [""] })
    const [club, setClub] = useState("")
    const [treeHouses, setTreeHouses] = useState([])
    //const [name, setName] = useState('')

    // const classes = useStyles();

    useEffect(() => {
        console.log("refresh")
        console.log(addedLink)
        API.dashboard(Auth.getToken())
            .then((res: any) => {
                const userData: IUserData = res.data.user
                setUser({
                    ...user, _id: userData._id, name: userData.name, email: userData.email, treeHouses: userData.treeHouses
                })
                API.getTreeHouses(userData._id)
                    .then((resd: any) => {
                        setClub(resd.data[0]._id)
                        setTreeHouses(resd.data[0].houses)
                        console.log(resd.data[0].houses)

                    })
                    .catch((err: any) => {
                        console.log(err)
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
            name: "Beta",
            controller: user._id,
            
            users: [user._id, "5ef16bfaddb4614b44126547"]
        }
        API.createTreeHouseClub(house)
            .then((res: any) => {
                console.log("completed")
                console.log(res)
            })
    }

    const images = [
        "https://images.craigslist.org/00Y0Y_igysUhCykMz_09i06d_600x450.jpg",
        "https://images.craigslist.org/00L0L_9Z0zJKdvNJb_0CI0pI_600x450.jpg",
        "https://images.craigslist.org/00l0l_4V70QohI7MJ_09i06d_600x450.jpg"
    ]


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <div style={{
                    backgroundColor: "#98c1da",
                    borderRadius: "20px"
                }}>
                    <h1>Dashboard</h1>
                    <LinkModal setAddedLink={setAddedLink} addedLink={addedLink} club={club} />
                    <ClubModal />
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
                <br></br>
                <Grid container spacing={2}>
                    {
                        treeHouses === []
                        ?null
                        :treeHouses.map((treeHouse: any) =>
                            <Grid item xs={6} sm={6} md={4}>
                                <HouseCard treeHouse={treeHouse} />
                            </Grid>
                        )
                    }

                    {/* <Grid item xs={6} sm={6} md={4}>
                        <HouseCard website={"https://www.google.com/"} images={images} />
                    </Grid> */}
                </Grid>
            </Container>
        </ThemeProvider>

    )
}

export default Dashboard;