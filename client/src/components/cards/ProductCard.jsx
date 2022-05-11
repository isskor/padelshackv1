import { useHistory } from 'react-router-dom';
import { AvgRatings } from '../../utils/AvgRatings';
import { useDispatch } from 'react-redux';
import { Card, Typography, Button } from '@material-ui/core/';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    // height: 290,
    backgroundColor: 'gray',
    background:
      'linear-gradient(0deg, rgba(205,205,205,1) 0%, rgba(245,245,245,1) 100%)',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
  },
  card: {
    height: 'calc(100% - 14px)',
    borderRadius: '2px',
    maxWidth: '300px',
    backgroundColor: 'transparent',
    minWidth: '150px',
    boxShadow: '0 0px 8px rgb(121 121 121 / 11%)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      boxShadow: '0 0px 4px 1px rgb(121 121 121 / 35%)',
    },
  },
  content: {
    flexGrow: 1,
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 1rem 1rem',
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

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();
  // redux
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // send to cart
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product },
    });
    // open drawer
    dispatch({
      type: 'SET_SIDE_DRAWER',
      payload: true,
    });
  };
  // destructure
  const { title, images, price, brand } = product;
  return (
    <>
      <Typography align='center' variant='caption'>
        {product && product.ratings && product.ratings.length > 0
          ? AvgRatings(product, '10px')
          : 'No rating yet'}
      </Typography>
      <Card className={classes.card} elevation={0}>
        <div
          className={classes.media}
          onClick={() => history.push(`/product/${product.slug}`)}
        >
          {images && images[0]?.url && (
            <img src={images[0]?.url} alt='' className={classes.img} />
          )}
        </div>
        <CardContent
          onClick={() => history.push(`/product/${product.slug}`)}
          className={classes.content}
        >
          <Typography gutterBottom variant='h5' component='h2' align='center'>
            {title}
          </Typography>
          <Typography>{brand.name}</Typography>
        </CardContent>
        <CardActions className={classes.cardBottom}>
          <Typography variant='body2'>${price}</Typography>
          <Button
            className={classes.button}
            variant='contained'
            disableElevation
            size='small'
            // fullWidth
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
