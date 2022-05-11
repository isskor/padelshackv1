import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0',
  },
}));
const ShowPaymentInfo = ({ order, user }) => {
  const classes = useStyles();
  const { paymentIntent } = order.paymentIntent;
  return (
    <div>
      <List className={classes.root}>
        {user === 'Admin' ? (
          <ListItem>Ordered By : {order.orderedBy}</ListItem>
        ) : (
          <ListItem>Order Id : {order._id}</ListItem>
        )}
        <ListItem>Payment Id : {paymentIntent.id}</ListItem>
        <ListItem>
          Amount :
          {(paymentIntent.amount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </ListItem>
        <ListItem>Method : {paymentIntent.payment_method_types[0]}</ListItem>{' '}
        <ListItem>Payment : {paymentIntent.status}</ListItem>{' '}
      </List>
    </div>
  );
};

export default ShowPaymentInfo;
