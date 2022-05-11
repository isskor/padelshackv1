import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../api/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../api/categories';
import FileUpload from '../../../components/forms/FileUpload';
import { getColors } from '../../../api/color';
import { getBrands } from '../../../api/brand';
const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: [],
  brands: [],
  color: [],
  brand: '',
  shape: '',
  weight: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [colorsArr, setColorsArr] = useState([]);
  const user = useSelector((state) => state.user);
  // destructure values
  useEffect(() => {
    loadCategories();
    async function loadCategories() {
      const c = await getCategories();
      const col = await getColors();
      const b = await getBrands();
      setColorsArr(col.data);
      setValues((values) => ({
        ...values,
        categories: c.data,
        brands: b.data,
      }));
    }
  }, []);

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
    createProduct(values, user.token)
      .then((res) => {
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data.err);
      });
  };

  return (
    <div>
      {loading ? 'loading' : <h4>Product Create</h4>}
      <hr />
      <div className='p-3'>
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>
      <ProductCreateForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCategoryChange={handleCategoryChange}
        subCategories={subCategories}
        colorsArr={colorsArr}
        values={values}
        setValues={setValues}
      />
    </div>
  );
};

export default ProductCreate;
