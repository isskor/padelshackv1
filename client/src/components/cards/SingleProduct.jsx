import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductInfoList from './ProductInfoList';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { AvgRatings } from '../../utils/AvgRatings';
import { addToWishlist } from '../../api/user';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModalImage from 'react-modal-image';

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: '0 auto',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  tabs: {
    background: 'transparent',
    color: '#404444',
    boxShadow: 'none',
    marginBottom: '1rem',
  },
  indicator: {
    backgroundColor: 'black',
  },
  button: {
    background: '#404444',
    color: 'white',
    transition: ' all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      color: 'black',
      transform: 'scale(1.05)',
    },
  },
  info: {
    padding: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '0 5rem',
    },
  },
  description: {
    whiteSpace: 'pre-line',
  },
  img: {
    cursor: 'pointer',
    userSelect: 'none',
  },
}));

const SingleProduct = ({ product, onStarClick, star }) => {
  const classes = useStyles();
  const { images, description, title, _id, price } = product;

  // tabs
  const [tab, setTab] = useState(1);
  const handleTabs = (event, newValue) => {
    setTab(newValue);
  };

  // modal
  const modal = useRef(null);
  const [modalImg, setModalImg] = useState('');
  const handleModal = (url) => {
    setModalImg(url);
    modal.current.toggleModal();
  };

  // redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product },
    });
    dispatch({
      type: 'SET_SIDE_DRAWER',
      payload: true,
    });
  };

  const handleAddToWishList = () => {
    addToWishlist(product._id, user.token).then((res) =>
      toast.success('Added to wishlist')
    );
  };

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item md={6}>
        <Carousel>
          {images &&
            images.map((i) => (
              <div
                key={i.public_id}
                className={classes.img}
                onClick={(e) => {
                  handleModal(i.url);
                }}
              >
                <img
                  src={i.url}
                  alt='padel racket'
                  style={{ height: 'auto' }}
                  className={classes.img}
                />
              </div>
            ))}
        </Carousel>
        {images && (
          <ModalImage
            ref={modal}
            large={modalImg}
            alt='padel racket'
            className='modal'
            imageBackgroundColor='white'
            hideDownload
          />
        )}
      </Grid>
      <Grid item md={6} className={classes.info}>
        <Typography variant='h3'>{title}</Typography>
        <div className={classes.buttonGroup}>
          {product && product.ratings && product.ratings.length > 0 ? (
            AvgRatings(product)
          ) : (
            <div className='text-center pt-1 pb-3'>No rating yet</div>
          )}
          <Button>
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                // has newRating, and name
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='Red'
              />
            </RatingModal>
          </Button>
        </div>
        <Typography variant='h6' gutterBottom>
          ${price}
        </Typography>
        <div className={classes.buttonGroup}>
          {product.quantity < 1 ? (
            <Button variant='outlined'>Out Of Stock</Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              variant='contained'
              size='large'
              endIcon={<ShoppingCartOutlinedIcon />}
              className={classes.button}
              fullWidth
            >
              Add To Cart
            </Button>
          )}
          <Button
            onClick={handleAddToWishList}
            size='large'
            className={classes.button}
          >
            <FavoriteBorderOutlinedIcon />
          </Button>
        </div>
        <ProductInfoList product={product} />
        <AppBar position='static' className={classes.tabs}>
          <Tabs
            value={tab}
            onChange={handleTabs}
            classes={{
              indicator: classes.indicator,
            }}
          >
            <Tab label='Description' value={1} />
            <Tab label='Shipping Info' value={2} />
          </Tabs>
        </AppBar>
        <div hidden={tab === 2}>
          <Typography className={classes.description}>
            {description && description}
          </Typography>
        </div>
        <div hidden={tab === 1}>
          <Typography>Call us on xxxx xxx xxx for more info</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default SingleProduct;
