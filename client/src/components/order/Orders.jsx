import React from 'react';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import OrderTable from './OrderTable';

import { makeStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
    padding: '1rem',
  },
  info: {
    marginBottom: '1rem',
  },
  Cancelled: {
    background: 'red',
  },
  Processing: {
    background: 'blue',
  },
  Dispatched: {
    background: 'black',
  },
  Completed: {
    background: 'Green',
  },
}));
const Orders = ({ orders, handleStatusChange }) => {
  const classes = useStyles();

  return (
    <>
      {orders.map((order) => (
        <Paper key={order._id} className={classes.root}>
          <Grid container justify='space-between' className={classes.info}>
            <Grid item xs={3}>
              <p>Order: {order._id}</p>
              <p>
                Ordered on :{' '}
                {new Date(
                  order.paymentIntent.paymentIntent.created * 1000
                ).toLocaleString()}
              </p>
              <p className={classes[order.orderStatus]}>
                Status: {order.orderStatus}
              </p>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <Select
                  defaultValue={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <MenuItem value={'Not Processed'}>Not Processed</MenuItem>
                  <MenuItem value={'Processing'}>Processing</MenuItem>
                  <MenuItem value={'Dispatched'}>Dispatched</MenuItem>
                  <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                  <MenuItem value={'Completed'}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container className={classes.content}>
            <Grid item md={3}>
              <ShowPaymentInfo order={order} user='Admin' />
            </Grid>
            <Grid item md={9}>
              <OrderTable order={order} />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  );
};

export default Orders;
