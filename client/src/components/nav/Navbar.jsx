import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Badge } from '@material-ui/core';
import NavDrawer from './NavDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',

    color: '#404040',
    boxShadow: '0 30px 30px rgb(255, 255, 255, 20%)',
    [theme.breakpoints.up('md')]: {
      padding: '0 5rem',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  shopLinks: {
    // flexGrow: 1,

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    // gap: '3rem',
  },
  links: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
      paddingRight: '3rem',
      display: 'flex',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  navRightSide: {
    display: 'flex',
  },
  cartIcon: {
    // marginLeft: '3rem',
    fontSize: '35px',
    color: '#404040',
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: '1rem',
  },
}))(MenuItem);

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  const cartItems = () => cart.reduce((acc, cur) => acc + cur.count, 0);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [openSideNav, setOpenSideNav] = useState(false);
  const handleDrawer = () => {
    setOpenSideNav(true);
  };

  return (
    <>
      <NavDrawer
        openSideNav={openSideNav}
        setOpenSideNav={setOpenSideNav}
        user={user}
        logout={logout}
      />
      <AppBar position='relative' className={classes.appBar} elevation={16}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawer}
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          <div className={classes.shopLinks}>
            <Link to='/'>
              <Button className={classes.links}>Home</Button>
            </Link>
            <Link to='/shop'>
              <Button className={classes.links}>Shop</Button>
            </Link>
          </div>
          <Search />

          <div className={classes.navRightSide}>
            {!user && (
              <>
                <Link to='/login'>
                  <Button className={classes.links}>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button className={classes.links}>Register</Button>
                </Link>
              </>
            )}

            {user && (
              <>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  className={classes.links}
                  onClick={handleMenu}
                  color='inherit'
                  disableRipple
                >
                  <AccountCircle fontSize='large' />
                </IconButton>
                <StyledMenu
                  id='customized-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {user && user.role === 'subscriber' && (
                    <Link to='/user/history'>
                      <StyledMenuItem onClick={handleMenuClose}>
                        My account
                      </StyledMenuItem>
                    </Link>
                  )}
                  {user && user.role === 'admin' && (
                    <Link to='/admin/dashboard'>
                      <StyledMenuItem onClick={handleMenuClose}>
                        Dashboard
                      </StyledMenuItem>
                    </Link>
                  )}
                  <StyledMenuItem
                    onClick={() => {
                      handleMenuClose();
                      logout();
                    }}
                  >
                    Sign Out
                  </StyledMenuItem>
                </StyledMenu>
              </>
            )}
            {/* <Link to='/cart'> */}
            <IconButton
              disableRipple
              color='inherit'
              className={classes.cartIcon}
              onClick={() =>
                dispatch({ type: 'SET_SIDE_DRAWER', payload: true })
              }
            >
              <Badge color='secondary' badgeContent={cartItems()}>
                <ShoppingCartOutlinedIcon fontSize='large' />
              </Badge>
            </IconButton>
            {/* </Link> */}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
