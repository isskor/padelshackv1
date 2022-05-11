import axios from 'axios';

export const createPaymentIntent = (coupon, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/create-payment`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};
