import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
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
// import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
// import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { ImageSearch } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function HouseCard(props: any) {
  const classes = useStyles();
  const [imgCount, setImgCount] = useState(3)
  const treeHouse = props.treeHouse

  // const createCarouselItemImage = (index, options = {}) => (
  //   <div key={index}>
  //     <img src={`/assets/${index}.jpeg`} />
  //     <p className="legend">Legend {index}</p>
  //   </div>
  // );




const slides = treeHouse.images.map((image:string, index:number) =>
  <div key={index}>
    <img src={image} />
  </div>
)

  // console.log(slides)

  //   const getConfigurableProps = () => ({
  //     showArrows: boolean('showArrows', true, tooglesGroupId),
  //     showStatus: boolean('showStatus', true, tooglesGroupId),
  //     showIndicators: boolean('showIndicators', true, tooglesGroupId),
  //     infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
  //     showThumbs: boolean('showThumbs', true, tooglesGroupId),
  //     useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
  //     autoPlay: boolean('autoPlay', true, tooglesGroupId),
  //     stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
  //     swipeable: boolean('swipeable', true, tooglesGroupId),
  //     dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
  //     emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
  //     thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
  //     selectedItem: number('selectedItem', 0, {}, valuesGroupId),
  //     interval: number('interval', 3000, {}, valuesGroupId),
  //     transitionTime: number('transitionTime', 150, {}, valuesGroupId),
  //     swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  // });


  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <div>
            {/* <CardMedia component="div"> */}
            <Carousel showArrows={true} showStatus={true} infiniteLoop={true} showIndicators={false} showThumbs={false} useKeyboardArrows={true} autoPlay={false} swipeable={true} emulateTouch={true} dynamicHeight={true} >
              {slides.map((slide:any) => slide.props.children)}
            </Carousel>
            {/* </CardMedia> */}
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${treeHouse.price} - ${treeHouse.bed} bd | ${treeHouse.bath} ba - ${treeHouse.location}`}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href={treeHouse.website} target="_blank">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </a>
          {/* <a href={props.favorite} target="_blank">
        <IconButton aria-label="share">
          <FavoriteIcon />
        </IconButton>
        </a> */}
        </CardActions>
      </Card>
    </div>
  );
}
