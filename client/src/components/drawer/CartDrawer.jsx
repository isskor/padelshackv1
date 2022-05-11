import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DrawerItem from './DrawerItem';
const useStyles = makeStyles({
  header: {
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
  },
  list: {
    width: 280,
    margin: '0.5rem 0',
  },
  cartBtn: {
    background: '#404444',
    color: 'white',
    margin: '0 0 1rem',
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

const CartDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const handleClose = () => {
    dispatch({
      type: 'SET_SIDE_DRAWER',
      payload: false,
    });
  };

  return (
    <SwipeableDrawer
      anchor='right'
      open={drawer}
      onClose={handleClose}
      onOpen={() => {}}
      BackdropProps={{ invisible: true }}
    >
      <div className={classes.header}>
        <h3>Cart</h3>
        <p>{cart.length} items</p>
      </div>
      <Link to='/cart' className={classes.link}>
        <Button
          variant='contained'
          size='large'
          fullWidth
          className={classes.cartBtn}
          onClick={handleClose}
        >
          Go To Cart
        </Button>
      </Link>
      <div className={classes.list}>
        {cart.map((p) => (
          <div key={p._id}>
            <DrawerItem product={p} />
            <Divider />
          </div>
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default CartDrawer;
