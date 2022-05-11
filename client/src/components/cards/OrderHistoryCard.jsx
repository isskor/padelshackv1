import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 0px 1.5px rgba(0,0,0, 20%)',
    // maxWidth: '700px',
    borderRadius: '0',
    width: '240px',
  },
  image: {
    width: '180px',
    objectFit: 'cover',
    cursor: 'pointer',
  },

  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
  },
  info: {
    paddingTop: '1rem',
  },
}));
const OrderHistoryCard = ({ orderProduct }) => {
  const { product } = orderProduct;
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <img
        src={product.images[0].url}
        alt={product.title}
        className={classes.image}
        onClick={() => history.push(`/product/${product.slug}`)}
      />
      <div className={classes.content}>
        <div className='info'>
          <Typography>{product.title}</Typography>
          <Typography variant='body2'>
            {product.color.map((c) => c.name).join(' / ')}{' '}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography variant='body2' gutterBottom>
            Quantity: {orderProduct.count}
          </Typography>
          <Typography variant='body2' gutterBottom>
            Price: ${product.price} x {orderProduct.count}{' '}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default OrderHistoryCard;
