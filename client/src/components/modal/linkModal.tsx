import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import API from '../../utils/API';
import theme from '../../utils/themeUtil'
import LoadingAnimation from '../loadingAnimation/loading-animation'
// import { CircleLoading } from 'react-loadingg';

const palette = theme

interface IScrapeData {
    data: {
        images: Array<string> | string;
        price: string;
        title: string;
        bed: number,
        bath: number,
        location?: string,
        address?: string,
        website: string,
    }
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            float: 'left',
            left: '50%',
            top: '37%',
            transform: "translate(-50%, -50%)",
            minWidth: '300px',
            width: '40%',
            backgroundColor: palette.palette.primary.main,
            //   border: '2px solid #44d362',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);

export default function LinkModal(props: any) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //   const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [webLink, setWebLink] = useState("")
    const [loading, setLoading] = useState(false)

    const handleOpen = () => {
        setLoading(false)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateField = (e: any) => {
        setWebLink(e.target.value)
    }





    const searchLink = (e: any) => {
        e.preventDefault();
        if (webLink !== '') {
            loadingEffect();
            API.scrape(webLink)
                .then(({ data }: IScrapeData) => {
                    console.log("before")
                    console.log(data)
                    console.log("after")

                    //Everything following is after a post to the database

                    
                    handleClose()
                    //Added to database.
                    API.updateTreeHouse(props.club, data)
                        .then((results: any) => {
                            props.setAddedLink(props.addedLink * -1) //This will cause the Dashboard to refresh.
                            console.log(results)
                        })

                    //create a new card function

                }
                )
        }

    }

    const loadingEffect = () => {
        ///this is a loading effect after submitting
        setWebLink("")
        //this is were I create the loading stuff
    }

    const sendSearch = (e: any) => {
        if (webLink !== '') {
            setLoading(true)
            searchLink(e)
        }
        //else error

    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
                {
                    loading
                        ? "Loading"
                        : "Enter link below"
                }
            </h2>
            {
                loading
                    ? <div> <br /> <LoadingAnimation /> <p id="simple-modal-description" style={{ textAlign: "center" }}>
                        Thank you for the link.
                        </p>
                    </div>
                    : (<form id="link-form" className={classes.form} onSubmit={sendSearch} noValidate>
                        <TextField
                            name="link"
                            margin="dense"
                            variant="standard"
                            style={{ marginRight: "10px", }}
                            required
                            fullWidth={true}
                            id="link"
                            label="Link-Search"
                            color="secondary"
                            onChange={(event) => { updateField(event) }}
                            value={webLink}
                            autoFocus
                        />
                        <Button
                            type="submit"

                            fullWidth={true}
                            variant="outlined"
                            color="secondary"
                            className={classes.submit}
                        >
                            Search
                    </Button>
                    </form>)
            }


        </div>
    );

    return (
        <div>
            <Button type="button" onClick={handleOpen} variant="outlined" color="secondary">
                Add Tree House
      </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
