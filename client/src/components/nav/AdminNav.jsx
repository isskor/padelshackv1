import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    color: 'black',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '1rem',
  },
  link: {
    color: 'black',
  },
}));
const AdminNav = () => {
  const classes = useStyles();
  return (
    <Paper component='nav' className={classes.root} elevetaion={0}>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <Link to='/admin/dashboard' className={classes.link}>
            Dashboard
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/products' className={classes.link}>
            All Products
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/product' className={classes.link}>
            Create Product
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/category' className={classes.link}>
            Category
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/sub' className={classes.link}>
            Sub Category
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/brand' className={classes.link}>
            Brands
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/color' className={classes.link}>
            Colors
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/admin/coupon' className={classes.link}>
            Coupons
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/user/password' className={classes.link}>
            Password
          </Link>
        </li>
      </ul>
    </Paper>
  );
};

export default AdminNav;
