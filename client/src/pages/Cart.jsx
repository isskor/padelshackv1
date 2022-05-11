import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../api/user';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import Container from '@material-ui/core/Container';
import { Button, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '2rem 0 ',
  },
  cartItems: {
    padding: '1rem',
  },
  list: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  summaryContainer: {
    width: '100%',
    padding: '1rem',
    maxWidth: '700px',
  },
  summary: {
    padding: '1rem',
    background: 'transparent',
  },
  summaryType: {
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    padding: '1rem 0',
  },
  checkoutBtn: {
    marginTop: '1rem',
    background: '#404444',
    color: 'white',
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

const Cart = () => {
  const classes = useStyles();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((acc, cur) => {
      return acc + cur.price * cur.count;
    }, 0);
  };

  const getQuantity = () => {
    return cart.reduce((acc, cur) => {
      return acc + cur.count;
    }, 0);
  };
  const saveOrderToDB = () => {
    // save order to DB
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push('/checkout');
      })
      .catch((err) => console.log(err));
  };

  const showCartItems = () => (
    <List className={classes.list}>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} product={p} />
      ))}
    </List>
  );

  return (
    <Container className={classes.root}>
      <Grid container justify='center'>
        <Grid item md={6} className={classes.cartItems}>
          <h4>Cart / {getQuantity()} products</h4>
          {!cart.length ? (
            <p>
              Empty cart. <Link to='/shop'>Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </Grid>
        <Grid item md={6} className={classes.summaryContainer}>
          <h4>Order Summary</h4>
          <Paper className={classes.summary} elevation={1}>
            <div className={classes.summaryType}>
              <Typography>{getQuantity()} Products</Typography>
              <Typography className={classes.value}>${getTotal()}</Typography>
            </div>
            <div className={classes.summaryType}>
              <Typography>Shipping</Typography>
              <Typography className={classes.value}>Free</Typography>
            </div>
            <div className={classes.summaryType}>
              <Typography variant='h6'> SubTotal</Typography>
              <Typography variant='h6' className={classes.value}>
                ${getTotal()}
              </Typography>
            </div>
            <Typography variant='body2' component='span'>
              Apply coupon at checkout
            </Typography>
          </Paper>

          {user ? (
            <Link to='/checkout' className={classes.link}>
              <Button
                size='large'
                variant='contained'
                onClick={saveOrderToDB}
                disabled={!cart.length}
                className={classes.checkoutBtn}
              >
                Proceed to Checkout
              </Button>
            </Link>
          ) : (
            <Link
              to={{
                pathname: '/login',
                state: { from: 'cart' },
              }}
              className={classes.link}
            >
              <Button
                variant='contained'
                size='large'
                className={classes.checkoutBtn}
              >
                Login to Checkout
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
