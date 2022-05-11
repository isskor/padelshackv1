import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

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
const UserNav = () => {
  const classes = useStyles();
  return (
    <Paper component='nav' className={classes.root} elevetaion={0}>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <Link to='/user/history' className={classes.link}>
            History
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/user/password' className={classes.link}>
            Password
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link to='/user/wishlist' className={classes.link}>
            Wishlist
          </Link>
        </li>
      </ul>
    </Paper>
  );
};

export default UserNav;
