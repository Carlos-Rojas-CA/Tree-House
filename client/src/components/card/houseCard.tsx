import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Modal from '@material-ui/core/Modal';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
// import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
// import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import API from '../../utils/API';
import theme from '../../utils/themeUtil'
// import $ from "jquery";

// import { ImageSearch } from '@material-ui/icons';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'relative',
      float: 'left',
      left: '50%',
      top: '50%',
      transform: "translate(-50%, -50%)",
      minWidth: '300px',
      width: '60%',
      height: '90%',
      overflowY: "scroll",
      // height: '20px',
      backgroundColor: 'white',
      //   border: '2px solid #44d362',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      maxWidth: 345,
    },

  }),
);


// const useStyles = makeStyles({

//   paper: {
//     position: 'absolute',
//     float: 'left',
//     left: '50%',
//     top: '50%',
//     transform: "translate(-50%, -50%)",
//     minWidth: '300px',
//     width: '80%',
//     // backgroundColor: palette.palette.primary.main,
//     //   border: '2px solid #44d362',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// });

export default function HouseCard(props: any) {
  const classes = useStyles();
  const [imgCount, setImgCount] = useState(3)
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const treeHouse = props.treeHouse

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const slides = treeHouse.images.map((image: string, index: number) =>
    <div key={index}>
      <img src={image} width="auto" height="194px" alt={`image number ${index}`} />
    </div>
  )

  const originalSlides = treeHouse.images.map((image: string, index: number) =>
    <div key={index}>
      <img src={image} height="100%" width="auto" style={{ maxHeight: '600px'}} alt={`image number ${index}`} />
    </div>
  )

  const likeThis = (e: any): any => {
    if (liked) {
      setLiked(false)
    } else {
      setLiked(true)
    }
  }

  const deleteThis = (e: any): any => {
    console.log("Delete this")
    console.log(treeHouse._id)
    const selector = {
      id: props.club,
      houseId: treeHouse._id
    }
    console.log(selector)
    API.deleteTreeHouse(selector)
      .then((res: any) => {
        props.setAddedLink(props.addedLink * -1) //This will cause the Dashboard to refresh.
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const body = (
    // <div >
    <Card className={classes.paper}>

      <Grid container>
        <Grid item xs={12}>
          <div style={{ width: '100%', height: "auto" }}>
            {/* <CardMedia component="div"> */}
            <Carousel showArrows={true} showStatus={true} infiniteLoop={true} showIndicators={false} showThumbs={false} useKeyboardArrows={true} autoPlay={false} swipeable={true} emulateTouch={true} dynamicHeight={true} >
              {originalSlides.map((slide: any) => slide.props.children)}
            </Carousel>
            {/* </CardMedia> */}
          </div>
        </Grid>
      </Grid>


        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${treeHouse.price} - ${treeHouse.bed} bd | ${treeHouse.bath} ba ${treeHouse.location}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p" align='left' style={{ whiteSpace: "pre-line" }}>
            {treeHouse.description}
            {/* <span style={{whiteSpace: "pre-line"}}>{treeHouse.description}</span> */}

          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align='left' >
            {
              treeHouse.sqft != ""
                ? `- ${treeHouse.sqft} sqft`
                : null
            }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align='left' >
            {
              treeHouse.address != ""
                ? `- ${treeHouse.address}`
                : null
            }
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p" align='left' >
              {
                treeHouse.addressHyper != ""
                  ? <a href={treeHouse.addressHyper} target="_blank" style={{color: '#a2979a', textDecoration: 'none'}} >{`- Google Maps`}</a>
                  : null
              }
            </Typography> */}
        </CardContent>
      <CardActions>
        <Grid container>
          <Grid item sm={4} >
            <a href={treeHouse.website} target="_blank">
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </a>
          </Grid>
          <Grid item sm={4} >
            <IconButton aria-label="like" onClick={likeThis} >
              {
                liked
                  ? <FavoriteIcon />
                  : <FavoriteBorderIcon />
              }

              <span>1</span>
            </IconButton>
          </Grid>
          <Grid item sm={4} >
            <IconButton aria-label="delete" onClick={deleteThis} >
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* <a href={props.favorite} target="_blank">
        <IconButton aria-label="share">
          <FavoriteIcon />
        </IconButton>
        </a> */}
      </CardActions>
    </Card>
    // </div>
  )


  if (treeHouse.location != '') {
    treeHouse.location = "- " + treeHouse.location
  }

  return (
    <div>
      <Card className={classes.root}>

        <div>
          {/* <CardMedia component="div"> */}
          <Carousel showArrows={true} showStatus={true} infiniteLoop={true} showIndicators={false} showThumbs={false} useKeyboardArrows={true} autoPlay={false} swipeable={true} emulateTouch={true} dynamicHeight={true} >
            {slides.map((slide: any) => slide.props.children)}
          </Carousel>
          {/* </CardMedia> */}
        </div>
        <CardActionArea onClick={handleOpen} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${treeHouse.price} - ${treeHouse.bed} bd | ${treeHouse.bath} ba ${treeHouse.location}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align='left' >
              {
                treeHouse.sqft != ""
                  ? `- ${treeHouse.sqft} sqft`
                  : null
              }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align='left' >
              {
                treeHouse.address != ""
                  ? `- ${treeHouse.address}`
                  : null
              }
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p" align='left' >
              {
                treeHouse.addressHyper != ""
                  ? <a href={treeHouse.addressHyper} target="_blank" style={{color: '#a2979a', textDecoration: 'none'}} >{`- Google Maps`}</a>
                  : null
              }
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container>
            <Grid item sm={4} >
              <a href={treeHouse.website} target="_blank">
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </a>
            </Grid>
            <Grid item sm={4} >
              <IconButton aria-label="like" onClick={likeThis} >
                {
                  liked
                    ? <FavoriteIcon />
                    : <FavoriteBorderIcon />
                }

                <span>1</span>
              </IconButton>
            </Grid>
            <Grid item sm={4} >
              <IconButton aria-label="delete" onClick={deleteThis} >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>







          {/* <a href={props.favorite} target="_blank">
        <IconButton aria-label="share">
          <FavoriteIcon />
        </IconButton>
        </a> */}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {body}
      </Modal>
    </div>
  );
}
