import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../../api/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const HighlightList = ({
  sort = 'createdAt',
  sortOrder = 'desc',
  itemPerPage = 3,
  productsCount,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(() => {
    getProducts(sort, sortOrder, page, itemPerPage).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  }, [sort, sortOrder, page, itemPerPage]);

  useEffect(() => {
    loadProducts();
  }, [page, loadProducts]);
  return (
    <>
      <Grid container justify='center' spacing={3}>
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
      </Grid>

      <Grid justify='center' container style={{ marginTop: '2rem' }}>
        <Pagination
          page={page}
          count={Math.ceil(productsCount / itemPerPage)}
          onChange={(e, value) => setPage(value)}
          // className={classes.pagination}
        />
      </Grid>
    </>
  );
};

export default HighlightList;
