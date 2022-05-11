import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '../stripe.css';
import StripeCheckout from '../components/StripeCheckout';
// load stripe outside of components render to avoid recreating stripe object on every render

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className=''>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
