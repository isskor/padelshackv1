import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { getProductsCount } from '../../api/product';

import { makeStyles } from '@material-ui/core/styles';
import HighlightList from './HighlightList';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5rem auto',
  },
  productList: {
    margin: '2rem 0',
  },
  productListTitle: {
    padding: '2rem 0',
  },
}));

const HighlightProducts = () => {
  const classes = useStyles();
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <Container className={classes.root}>
      <div className={classes.productList}>
        <Typography
          variant='h4'
          align='center'
          className={classes.productListTitle}
        >
          New Arrivals
        </Typography>
        <HighlightList
          sort='createdAt'
          sortOrder='desc'
          itemsPerPage={3}
          productsCount={productsCount}
        />
      </div>
      <Divider />
      <div className={classes.productList}>
        <Typography
          variant='h4'
          align='center'
          className={classes.productListTitle}
        >
          Best Sellers
        </Typography>
        <HighlightList
          sort='sold'
          productsCount={productsCount}
          sortOrder='desc'
          itemsPerPage={3}
        />
      </div>
    </Container>
  );
};

export default HighlightProducts;
