import { useState, useEffect } from 'react';
import { getProducts, getProductsCount } from '../../api/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';

import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const itemPerPage = 3;

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadProducts = () => {
    setLoading(true);
    // sort, order, limit
    // sort, order, page, items perPage
    getProducts('sold', 'desc', page, itemPerPage).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };
  return (
    <Container>
      {loading ? (
        <LoadingCard count={itemPerPage} />
      ) : (
        <Grid container justify='space-around'>
          {products.map((p) => (
            <Grid item key={p._id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}

      <Grid justify='center' container style={{ marginTop: '2rem' }}>
        <Pagination
          page={page}
          count={productsCount / 3}
          onChange={(e, value) => setPage(value)}
        />
      </Grid>
    </Container>
  );
};

export default BestSellers;
