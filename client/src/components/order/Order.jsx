import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '& .MuiSelect-select': {
      fontSize: '14px',
    },
  },
});
const Order = ({ order, handleStatusChange }) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const { paymentIntent } = order.paymentIntent;
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {order._id}
        </TableCell>
        <TableCell align='right'>{order.orderedBy}</TableCell>
        <TableCell align='right'>
          {
            new Date(paymentIntent.created * 1000)
              .toLocaleString()
              .split(',')[0]
          }
        </TableCell>
        <TableCell align='right'>
          {(paymentIntent.amount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </TableCell>
        <TableCell align='right'>{paymentIntent.status}</TableCell>
        <TableCell align='right'>
          {' '}
          <Select
            value={order.orderStatus}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <MenuItem value={'Not Processed'}>Not Processed</MenuItem>
            <MenuItem value={'Processing'}>Processing</MenuItem>
            <MenuItem value={'Dispatched'}>Dispatched</MenuItem>
            <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
            <MenuItem value={'Completed'}>Completed</MenuItem>
          </Select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='body1'>
                <b> Payment </b>
              </Typography>
              <Typography variant='body2'>
                Payment Id: {paymentIntent.id}
              </Typography>
              <Typography variant='body2' gutterBottom>
                Payment type: {paymentIntent.payment_method_types[0]}
              </Typography>
              <Typography variant='body1'>
                <b> Products </b>
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell component='th' scope='row'>
                        {p.product?.title}
                      </TableCell>
                      <TableCell>{p.product?.price}</TableCell>
                      <TableCell align='right'>{p.count}</TableCell>
                      <TableCell align='right'>
                        ${p.count * p.product?.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Order;
