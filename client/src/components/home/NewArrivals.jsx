import { useState, useEffect } from 'react';
import { getProducts, getProductsCount } from '../../api/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const itemPerPage = 3;

const NewArrivals = () => {
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
    // sort, order, page, items perPage
    getProducts('createdAt', 'desc', page, itemPerPage).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };
  return (
    <>
      <Grid container justify='center' spacing={10}>
        {loading ? (
          <Grid item>
            <LoadingCard count={itemPerPage} />
          </Grid>
        ) : (
          <>
            {products.map((p) => (
              <Grid item key={p._id}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </>
        )}
        <Grid item xs={12}>
          <Grid justify='center' container style={{ marginTop: '2rem' }}>
            <Pagination
              page={page}
              count={productsCount / itemPerPage}
              onChange={(e, value) => setPage(value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewArrivals;
