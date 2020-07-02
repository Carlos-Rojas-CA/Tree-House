import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import API from '../../utils/API';
import theme from '../../utils/themeUtil'
import LoadingAnimation from '../loadingAnimation/loading-animation'
import CircleImage from '../circle-image/circle-image'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
// import { CircleLoading } from 'react-loadingg';

const palette = theme

// interface IScrapeData {
//     data: {
//         images: Array<string> | string;
//         price: string;
//         title: string;
//     }
// }


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            float: 'left',
            left: '50%',
            top: '37%',
            transform: "translate(-50%, -50%)",
            // minWidth: '300px',
            width: '400px',
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
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
    }),
);

export default function ClubModal(props: any) {
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





    const body = (
        <Container className={classes.paper}>
            <h2 style={{ textAlign: "center" }} > Which club?</h2>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={4}>
                    <Avatar className={classes.purple}> CR </Avatar>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                    <CircleImage clubName={"Carl"} />
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                    <CircleImage clubName={"Cyndy"} />
                </Grid>
            </Grid>


        </Container>

    );

    return (
        <div>
            <Button type="button" onClick={handleOpen} variant="outlined" color="secondary">
                Choose Club
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

