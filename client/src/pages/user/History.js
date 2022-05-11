import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../api/user';
import { Container, Grid, List, Paper, Typography } from '@material-ui/core';
import OrderHistoryCard from '../../components/cards/OrderHistoryCard';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import UserNav from '../../components/nav/UserNav';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    minHeight: '100vh',
  },
  nav: {
    padding: 0,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  content: {
    padding: '1rem',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  order: {
    padding: '1rem',
  },
  orderInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    padding: '1rem 0',
  },
  orderId: {
    flex: '100%',
  },
  orderProducts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
}));

const History = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  }, [user.token]);

  const date = (d) => {
    let newD = new Date(d);
    return newD.toLocaleDateString();
  };

  const showOrders = () =>
    orders.map((order, i) => (
      <Paper key={i} className={classes.order}>
        <Typography variant='h6' className={classes.orderId}>
          Order ID: {order._id}
        </Typography>
        <div className={classes.orderInfo}>
          <div>
            <Typography>
              <b>Order Date </b>
            </Typography>
            <Typography>{date(order.createdAt)}</Typography>
          </div>
          <div>
            <Typography>
              <b>Total Amount Paid </b>
            </Typography>
            <Typography>
              {order.paymentIntent.paymentIntent.amount / 100}{' '}
              {order.paymentIntent.paymentIntent.currency.toUpperCase()}
            </Typography>
          </div>
          <div>
            <Typography>
              <b>Order Status</b>
            </Typography>
            <Typography>{order.orderStatus}</Typography>
          </div>
        </div>

        <div className={classes.orderProducts}>
          {order.products.map((p) => (
            <OrderHistoryCard orderProduct={p} key={p._id} />
          ))}
        </div>
      </Paper>
    ));

  return (
    <Grid container className={classes.root}>
      <Grid item sm={3} md={2} className={classes.nav}>
        <UserNav />
      </Grid>
      <Grid item xs={12} sm={9} className={classes.content}>
        <Container>
          <h4 style={{ marginBottom: '2rem' }}>
            {orders.length ? 'My Purchase Orders ' : 'No purchase orders'}
          </h4>
          <List className={classes.orderList}>{showOrders()}</List>
        </Container>
      </Grid>
    </Grid>
  );
};

export default History;
