import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Button } from '@material-ui/core/';

import { AvgRatings } from '../../utils/AvgRatings';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 290,
    backgroundColor: 'gray',
    background:
      'linear-gradient(0deg, rgba(205,205,205,1) 0%, rgba(245,245,245,1) 100%)',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
  },
  card: {
    borderRadius: '2px',
    maxWidth: '300px',
    backgroundColor: 'transparent',
    minWidth: '260px',
    boxShadow: '0 0px 8px rgb(121 121 121 / 11%)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0px 4px 1px rgb(121 121 121 / 35%)',
    },
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  button: {
    // margin: '0 0 auto 0',
    backgroundColor: '#111111',
    color: 'white',

    '&:hover': {
      color: 'black',
    },
  },
  imageCtn: {
    backgroundColor: 'gray',
  },
}));

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const classes = useStyles();
  const { title, images, slug, price, brand, quantity } = product;
  return (
    <>
      <Typography align='center' variant='caption'>
        {product && product.ratings && product.ratings.length > 0
          ? AvgRatings(product, '10px')
          : 'No rating yet'}
      </Typography>
      <Card className={classes.card} elevation={0}>
        <div className={classes.media}>
          {images && images[0]?.url && (
            <img src={images[0]?.url} alt='' className={classes.img} />
          )}
        </div>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Title: {title}
          </Typography>
          <Typography>Brand: {brand.name}</Typography>
          <Typography>Price: ${price}</Typography>
          <Typography>Available: {quantity}</Typography>
        </CardContent>
        <CardActions className={classes.cardBottom}>
          <Link to={`/admin/product/${slug}`} className={classes.link}>
            <Button
              className={classes.button}
              variant='contained'
              disableElevation
              size='small'
              // fullWidth
            >
              edit
            </Button>
          </Link>
          <Button
            className={classes.button}
            variant='contained'
            disableElevation
            size='small'
            // fullWidth
            onClick={() => handleRemove(slug)}
          >
            delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AdminProductCard;
