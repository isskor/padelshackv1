import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Order from './Order';
const OrderTable = ({ orders, handleStatusChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>OrderId</TableCell>
            <TableCell align='right'>Ordered By</TableCell>
            <TableCell align='right'>Date</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right'>Payment</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Order
              key={order._id}
              handleStatusChange={handleStatusChange}
              order={order}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
