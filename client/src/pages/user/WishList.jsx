import React, { useCallback, useEffect, useState } from 'react';
import { getWishlist, removeWishlist } from '../../api/user';
import UserNav from '../../components/nav/UserNav';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/cards/ProductCard';
import { Button, Grid, makeStyles, Container } from '@material-ui/core';

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
    // margin: '1rem',
    padding: '1rem',
  },
}));

const WishList = () => {
  const classes = useStyles();
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);

  const loadWishlist = useCallback(() => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  }, [user.token]);
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);
  const handleRemove = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sm={3} md={2} className={classes.nav}>
        <UserNav />
      </Grid>
      <Grid item xs={12} sm={9} className={classes.content}>
        <Container>
          <h4>Wishlist</h4>
          <Grid container spacing={6}>
            {wishlist.map((p) => (
              <Grid item md={4} key={p._id}>
                <ProductCard product={p} />
                <Button onClick={() => handleRemove(p._id)}>
                  remove from wishlist
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default WishList;
