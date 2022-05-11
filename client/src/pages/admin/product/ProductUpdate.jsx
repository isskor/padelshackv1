import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../api/product';

import { getCategories, getCategorySubs } from '../../../api/categories';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { getBrands } from '../../../api/brand';
import { getColors } from '../../../api/color';
import { Container } from '@material-ui/core';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  color: [],
  brand: '',
  shape: '',
  weight: '',
};

const ProductUpdate = ({ history, match }) => {
  const user = useSelector((state) => state.user);

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  // destructure values
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadOptions();

    async function loadProduct() {
      getProduct(slug)
        .then((res) => {
          setValues((values) => ({ ...values, ...res.data }));
          // get sub categories for this product
          getCategorySubs(res.data.category._id).then((res) => {
            setSubCategories(res.data);
          });
        })
        .catch((err) => console.log(err));
    }
  }, [slug]);

  const loadOptions = () => {
    getCategories().then((c) => setCategories(c.data));
    getColors().then((colors) => setColors(colors.data));
    getBrands().then((b) => setBrands(b.data));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    if (e.target.value === 'Please Select') {
      setSubCategories([]);
      return;
    }
    setValues({ ...values, category: e.target.value, subs: [] });

    getCategorySubs(e.target.value).then((res) => {
      setSubCategories(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProduct(slug, values, user.token)
      .then((res) => {
        //
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push('/admin/products');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  return (
    <Container>
      <h4>Product Create</h4>
      <hr />
      {loading ? (
        'loading'
      ) : (
        <>
          <div>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subCategories={subCategories}
            categories={categories}
            colors={colors}
            brands={brands}
          />
        </>
      )}
    </Container>
  );
};

export default ProductUpdate;
