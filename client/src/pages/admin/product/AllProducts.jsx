import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductsByCount, removeProduct } from '../../../api/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import SearchFilterInput from '../../../components/forms/SearchFilterInput';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm('Are you sure you want to delete')) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };
  const searched = (keyword) => (c) =>
    c.title.toLowerCase().includes(keyword) ||
    c._id.toLowerCase().includes(keyword);

  return (
    <div className='col'>
      {loading ? (
        <h4 className='text-danger'>Loading</h4>
      ) : (
        <h4>All Products</h4>
      )}
      <SearchFilterInput
        keyword={keyword}
        setKeyword={setKeyword}
        label='Filter by name or product id'
      />
      <Grid container>
        {products.filter(searched(keyword)).map((p) => (
          <Grid item key={p._id}>
            <AdminProductCard product={p} handleRemove={handleRemove} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;
