import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, List, ListItem } from '@material-ui/core';
const useStyles = makeStyles({
  root: {},
  header: {
    display: 'flex',
  },
  list: {
    width: ' 100vw',
    margin: '0.5rem 0',
    textDecoration: 'none',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    '& > a': {
      color: 'black',
    },
  },
  closeButton: {
    display: 'block',
    marginLeft: 'auto',
  },
});

const NavDrawer = ({ setOpenSideNav, openSideNav, user, logout }) => {
  const classes = useStyles();
  const handleClose = () => {
    setOpenSideNav(false);
  };
  const handleOpen = () => {
    setOpenSideNav(true);
  };

  return (
    <SwipeableDrawer
      anchor='left'
      open={openSideNav}
      onClose={handleClose}
      onOpen={handleOpen}
      BackdropProps={{ invisible: true }}
      className={classes.root}
    >
      <div className={classes.header}>
        <h2>logo</h2>
        <IconButton
          aria-label='close'
          color='primary'
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon fontSize='large' />
        </IconButton>
      </div>
      <List className={classes.list} onClick={handleClose}>
        <ListItem className={classes.listItem}>
          <Link to='/'>Home</Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to='/shop'>Shop</Link>
        </ListItem>
        {!user && (
          <>
            <ListItem className={classes.listItem}>
              <Link to='/login'>Login</Link>
            </ListItem>

            <ListItem className={classes.listItem}>
              <Link to='/register'>Register</Link>
            </ListItem>
          </>
        )}
        {user && (
          <>
            {user && user.role === 'subscriber' && (
              <>
                <ListItem className={classes.listItem}>
                  <Link to='/user/history'>My Purchases</Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/user/wishlist'>My Wishlist</Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/user/history'>Reset Password</Link>
                </ListItem>
              </>
            )}
            {user && user.role === 'admin' && (
              <>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/dashboard'>Dashboard</Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/dashboard' className={classes.link}>
                    Dashboard
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/products' className={classes.link}>
                    All Products
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/product' className={classes.link}>
                    Create Product
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/category' className={classes.link}>
                    Category
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/sub' className={classes.link}>
                    Sub Category
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/brand' className={classes.link}>
                    Brands
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/color' className={classes.link}>
                    Colors
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/admin/coupon' className={classes.link}>
                    Coupons
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/user/password' className={classes.link}>
                    Password
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem className={classes.listItem} onClick={logout}>
              Sign Out
            </ListItem>
          </>
        )}
      </List>
    </SwipeableDrawer>
  );
};

export default NavDrawer;
