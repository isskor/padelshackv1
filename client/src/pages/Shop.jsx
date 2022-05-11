import { getProductsByCount, getProductsByFilter } from '../api/product';
import { getCategories } from '../api/categories';
import { getSubs } from '../api/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { useEffect, useState } from 'react';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import Star from '../components/forms/Star';

const { SubMenu, ItemGroup } = Menu;

const initFilter = {
  price: [0, 9999],
  categoryIds: [],
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 9999]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [subId, setSubId] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState();
  const [ok, setOk] = useState(false);
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'Asus',
    'Dell',
  ]);
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState([]);
  const [shipping, setShipping] = useState();

  const search = useSelector((state) => state.search);
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const loadProductsByFilter = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1  load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    //   delay requests by 300 ms to fetch less
    const delay = setTimeout(() => {
      loadProductsByFilter({ query: text });
      setStar(null);
      setCategoryIds([]);
      setPrice([0, 9999]);
      setColor('');
      setBrand('');
      setShipping('');
      setSubId(null);
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // 3.  load by price
  useEffect(() => {
    loadProductsByFilter({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    // reset
    setStar(null);
    setSubId(null);
    setCategoryIds([]);
    setPrice(value);
    setColor('');
    setShipping('');
    setBrand('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //   4. load by category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 px-4'
          value={c._id}
          name='category'
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handlecheck for categories
  const handleCheck = (e) => {
    dispatch({
      type: 'SEACH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 9999]);
    setStar(null);
    setSubId(null);
    setColor('');
    setBrand('');
    setShipping('');
    let newCats;
    if (categoryIds.includes(e.target.value)) {
      newCats = categoryIds.filter((c) => c !== e.target.value);
    } else {
      newCats = [...categoryIds, e.target.value];
    }
    setCategoryIds(newCats);
    loadProductsByFilter({ category: newCats });
  };

  // 5. load products by rating
  const handleStarClick = (num) => {
    //
    dispatch({
      type: 'SEACH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 9999]);
    setSubId(null);
    setCategoryIds([]);
    setStar(num);
    setBrand('');
    setColor('');
    setShipping('');
    loadProductsByFilter({ stars: num });
  };

  const showStars = () => (
    <div className='px-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. load by sub category

  const showSubs = () =>
    subs.map((s) => (
      <div
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: 'pointer' }}
        key={s._id}
        onClick={() => handleSub(s)}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    setSubId(sub._id);
    dispatch({
      type: 'SEACH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 9999]);

    setCategoryIds([]);
    setStar(null);
    setBrand('');
    setColor('');
    setShipping('');
    loadProductsByFilter({ sub: sub._id });
  };

  //   7. load by brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className='py-1 pr-5 '
        key={b}
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSubId(null);
    dispatch({
      type: 'SEACH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 9999]);
    setCategoryIds([]);
    setStar(null);
    setBrand(e.target.value);
    setColor('');
    setShipping('');
    loadProductsByFilter({ brand: e.target.value });
  };
  //   8. load by COLOR
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className='py-1 pr-5 '
        key={c}
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSubId(null);
    dispatch({
      type: 'SEACH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 9999]);
    setCategoryIds([]);
    setStar(null);
    setBrand(null);
    setColor(e.target.value);
    setShipping('');
    loadProductsByFilter({ color: e.target.value });
  };

  // 9. load by shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className='pb-2 px-4'
        onChange={handleShippingChange}
        value='Yes'
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>
      <Checkbox
        className='pb-2 px-4'
        onChange={handleShippingChange}
        value='No'
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  );
  const handleShippingChange = (e) => {
    setSubId(null);
    dispatch({
      type: 'SEACH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 9999]);
    setCategoryIds([]);
    setStar(null);
    setBrand(null);
    setColor(null);
    setShipping(e.target.value);
    loadProductsByFilter({ shipping: e.target.value });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search Filter</h4>
          <hr />
          <Menu mode='inline' defaultOpenKeys={['1', '2', '3', '4', '5', '6']}>
            {/* price */}
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div className=''>
                <Slider
                  className='mx-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max='9999'
                />
              </div>
            </SubMenu>
            {/* category */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div className=''>{showCategories()}</div>
            </SubMenu>
            {/* Rating */}
            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div className=''>{showStars()}</div>
            </SubMenu>
            {/* Sub category */}
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Sub categories
                </span>
              }
            >
              <div className=''>{showSubs()}</div>
            </SubMenu>
            {/* Brands */}
            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div className='pr-5'>{showBrands()}</div>
            </SubMenu>
            {/* Colors */}
            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div className='pr-5'>{showColors()}</div>
            </SubMenu>
            {/* Shipping */}
            <SubMenu
              key='7'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div className='pr-5'>{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading</h4>
          ) : (
            <h4 className='text-danger'>Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className='row'>
            {products.map((p) => (
              <div key={p._id} className='col-md-4 mt-4'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
