import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../api/stripe';
import { Link } from 'react-router-dom';

import { createOrder, emptyUserCart } from '../api/user';
import { Button, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.5rem',
    maxWidth: '700px',
    '& #card-element ': {
      border: '1px solid #a9a9ff',
      padding: '1rem 0.5rem',
    },
    '@media (min-width:400px)': {
      margin: '1rem',
      padding: '1rem',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '2rem',
    },
  },
  checkoutBtn: {
    marginTop: '1rem',
    background: '#404444',
    color: 'white',
  },
  discount: {
    background: '#d3ffd4',
    padding: '1rem',
  },
  totalSummary: {
    '& > p': {
      textAlign: 'start',
      padding: '0.5rem',
    },
  },
}));
const StripeCheckout = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(coupon, user.token).then((res) => {
      setClientSecret(res.data.clientSecret);
      // additional info
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, [coupon, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: e.target.name.value },
      },
    });

    if (payload.error) {
      //
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // successful payment
      setProcessing(false);
      setSucceeded(true);
      // create order and save in database for admin
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart');
          // empty cart and coupon from redux
          dispatch({
            type: 'EMPTY_CART',
          });
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false,
          });
          // empty cart from db
          emptyUserCart(user.token);
        }
      });
    }
  };
  const handleChange = async (e) => {
    //   listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disables if there is an error
    setError(e.error ? e.error.message : ''); // shows error
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',

        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <Paper className={classes.root} elevation={5}>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount > 0 ? (
            <p
              className={classes.discount}
            >{`Total after coupon: $${totalAfterDiscount}`}</p>
          ) : (
            ''
          )}
        </div>
      )}
      {succeeded && (
        <p>
          Payment Successful.{' '}
          <Link to='/user/history'>See order in purchase history</Link>
        </p>
      )}
      <div className={classes.totalSummary}>
        <p>Total: ${cartTotal}</p>
        <p>
          <b>Total payable: ${payable / 100}</b>
        </p>
      </div>
      {!succeeded && (
        <form id='payment-form' onSubmit={handleSubmit}>
          <CardElement
            id='card-element'
            onChange={handleChange}
            options={cartStyle}
          />
          <Button
            variant='contained'
            fullWidth
            size='large'
            type='submit'
            disabled={processing || disabled || succeeded}
            classes={{
              root: classes.checkoutBtn,
              disabled: classes.disabled,
            }}
          >
            {processing ? <CircularProgress /> : 'Pay'}
          </Button>
          {error && (
            <div>
              <Typography color='secondary'>{error}</Typography>
            </div>
          )}
        </form>
      )}
      <Typography>
        For testing only, no purchase will actually be made!
      </Typography>
      <Typography>For testing use:</Typography>
      <Typography>Card: 4242 4242 4242 4242</Typography>
      <Typography>Month: any</Typography>
      <Typography>CVC: any</Typography>
      <Typography>zip: any</Typography>
    </Paper>
  );
};

export default StripeCheckout;
