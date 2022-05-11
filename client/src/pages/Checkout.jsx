import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../api/user';
import CheckoutAddressForm from '../components/forms/CheckoutAddressForm';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem 1rem',
  },
  addressForm: {
    padding: '1rem',
    maxWidth: '700px',
    [theme.breakpoints.up('md')]: {
      padding: '2rem',
    },
  },
  orderSummary: {
    maxWidth: '700px',
    padding: '1rem 0',
    [theme.breakpoints.up('md')]: {
      padding: '2rem',
    },
  },
  summary: {
    padding: '1rem',
    background: 'transparent',
    marginBottom: '1rem',
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
  discount: {
    color: 'green',
    fontSize: '1.4rem',
  },
  empty: {
    marginTop: '1rem',
    fontSize: '0.7rem',
    marginLeft: '1rem',
  },
}));

const initAddress = {
  name: '',
  address: '',
  addressNumber: '',
  zipCode: '',
  city: '',
  country: '',
};

const Checkout = ({ history }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [address, setAddress] = useState(initAddress);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
      }
    });
  };

  const emptyCart = () => {
    //remove from ls
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    // remove from redux
    dispatch({
      type: 'EMPTY_CART',
    });
    // remove from db
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setDiscountError('');
      setDiscountTotal(0);
      toast.success('Cart is empty');
    });
  };

  const getQuantity = () => {
    return products.reduce((acc, cur) => {
      return acc + cur.count;
    }, 0);
  };

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token).then((res) => {
      if (res.data) {
        setDiscountTotal(res.data);
        // push new total to redux
        // update redux coupon applied
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
      }
    });
  };

  return (
    <Container className={classes.root}>
      <Grid container justify='center' className={classes.containerGrid}>
        <Grid item sm={6} className={classes.addressForm}>
          <h4>Delivery address</h4>
          <CheckoutAddressForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={address}
          />
          <h4>Got Coupon?</h4>
          <TextField
            type='text'
            label='Coupon'
            name='coupon'
            value={coupon}
            onChange={(e) => {
              setDiscountError('');
              setCoupon(e.target.value);
            }}
          />
          <Button
            variant='contained'
            className={classes.checkoutBtn}
            onClick={applyDiscountCoupon}
          >
            Apply Coupon
          </Button>
          <br />
          {discountError && <p className='bg-danger p-2'>{discountError}</p>}
        </Grid>
        <Grid item sm={6} className={classes.orderSummary}>
          <h4>Order Summary</h4>
          <Paper className={classes.summary} elevation={1}>
            <div className={classes.summaryType}>
              <Typography> {getQuantity()} Products </Typography>
              <Typography className={classes.value}></Typography>
            </div>
            <Divider />
            {products.map((p, i) => (
              <div className={classes.summaryType} key={i}>
                <Typography>
                  {p.product.title} x {p.count}
                </Typography>
                <Typography className={classes.value}>
                  ${p.product.price * p.count}
                </Typography>
              </div>
            ))}
            <Divider />
            <div className={classes.summaryType}>
              <Typography>Shipping</Typography>
              <Typography className={classes.value}>Free</Typography>
            </div>
            <div className={classes.summaryType}>
              <Typography variant='h6'> SubTotal</Typography>
              <Typography variant='h6' className={classes.value}>
                ${total}
              </Typography>
            </div>
            {discountTotal > 0 && (
              <div className={`${classes.summaryType} `}>
                <Typography variant='h6' component=''>
                  Total After Discount:
                  <Typography
                    variant='body2'
                    className={`${classes.value} ${classes.discount}`}
                  >
                    ${discountTotal}
                  </Typography>
                </Typography>
              </div>
            )}
          </Paper>

          <Grid
            container
            justify='space-between'
            alignItems='flex-end'
            spacing={2}
            className={classes.btnGroup}
          >
            <Grid item md={6}>
              <Button
                variant='contained'
                fullWidth
                disabled={!addressSaved || !products.length}
                onClick={() => history.push('/payment')}
                classes={{
                  root: classes.checkoutBtn,
                  disabled: classes.disabled,
                }}
              >
                Place Order
              </Button>
            </Grid>
            <Grid item md={4}>
              <Button
                variant='contained'
                disabled={!products.length}
                onClick={emptyCart}
                className={classes.empty}
              >
                Empty Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
