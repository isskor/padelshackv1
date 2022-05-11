import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// api
import {
  getProductsByCount,
  getProductsByFilter,
  getProductsCount,
} from '../api/product';
import { getCategories } from '../api/categories';
import { getSubs } from '../api/sub';
import { getBrands } from '../api/brand';
import { getColors } from '../api/color';
// components
import ProductCard from '../components/cards/ProductCard';
import CollapseGroup from '../components/Filters/Collapse';
import CollapseSlider from '../components/Filters/CollapseSlider';
import CollapseStar from '../components/Filters/CollapseStar';
// mui
import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';

import Pagination from '@material-ui/lab/Pagination';

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    gap: '0.5rem',
  },
  media: {
    height: 200,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: '100%',
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.up('sm')]: {
      padding: '0 2rem',
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: '100%',
    marginLeft: 0,
  },

  grid: {
    display: 'grid',
    width: '100%',
    margin: '0 auto',
    justifyContent: 'center',
    gap: '8px',
    padding: '1rem',
    gridTemplateColumns: ' repeat( auto-fit, minmax(150px, 250px) )',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: ' repeat( auto-fit, minmax(150px, 300px) )',
    },
  },

  pageSort: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    width: '100%',
  },
  sort: {
    width: '15ch',
  },
  pageSize: {
    width: '10ch',
  },
  pagination: {
    padding: '2rem 0',
  },
}));

const Shop = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 300]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  // page
  const pageSizes = [12, 18, 24];
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [productsCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
  };

  // sort
  const sortArr = [
    { name: 'Most Popular', value: ['sold', 'desc'] },
    { name: 'Latest Added', value: ['createdAt', 'desc'] },
    { name: 'Price Asc', value: ['price', 'asc'] },
    { name: 'Price Desc', value: ['price', 'desc'] },
  ];
  const [sort, setSort] = useState(sortArr[0].name);
  const [sortFilter, setSortFilter] = useState(sortArr[0].value);
  const handleSort = (e) => {
    setSort(e.target.value);
    const findSortValue = sortArr.find((s) => s.name === e.target.value);
    setSortFilter(findSortValue.value);
  };

  const { query, rest } = search;

  const handleFilters = (args) => {
    setCurrentPage(1);
    dispatch({
      type: 'FILTERS_CHANGE',
      payload: args,
    });
  };

  // get data for filters
  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
    getColors().then((res) => setColors(res.data));
    getBrands().then((res) => setBrands(res.data));
    dispatch({ type: 'FILTER_PRICE', payload: price });

    getProductsCount().then((res) => setProductsCount(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      loadProductsByFilter(search);
      if (!query) {
        loadProductsByFilter(search);
      }
    }, 300);
    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const loadProductsByFilter = (filters, page) => {
    getProductsByFilter({
      filters,
      page: { pageSize: itemsPerPage, currentPage },
      sortFilter,
    }).then((res) => {
      setProducts(res.data);
    });
  };
  // 3.  load by filters
  useEffect(() => {
    if (search) loadProductsByFilter(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ok, rest, itemsPerPage, currentPage, sortFilter]);

  const handleSlider = (e, value) => {
    setPrice(value);
    setCurrentPage(1);
    dispatch({ type: 'FILTER_PRICE', payload: value });
    setTimeout(() => {
      setOk(!ok);
    }, 5000);
  };

  const handleClearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <h4>Search Filter</h4>
        <Button onClick={handleClearFilters}>Clear All Filters</Button>
        <CollapseSlider v={price} handleChange={handleSlider} title={'price'} />

        <CollapseGroup
          listToLoop={categories}
          type='category'
          title='Categories'
          checkList={rest.category}
          handleFilters={handleFilters}
          defaultOpen={true}
        />
        <CollapseGroup
          listToLoop={brands}
          type='brand'
          title='Brands'
          checkList={rest.brand}
          handleFilters={handleFilters}
          defaultOpen={rest.brand.length > 0}
        />
        <CollapseGroup
          listToLoop={['Round', 'Diamond', 'Teardrop']}
          type='shape'
          title='Shape'
          checkList={rest.shape}
          handleFilters={handleFilters}
          defaultOpen={true}
        />
        <CollapseGroup
          listToLoop={colors}
          type='color'
          title='Colors'
          checkList={rest.color}
          handleFilters={handleFilters}
        />
        <CollapseGroup
          listToLoop={subs}
          type='subs'
          title='Sub Categories'
          checkList={rest.subs}
          handleFilters={handleFilters}
          defaultOpen={rest.subs.length > 0}
        />

        <CollapseStar
          type='stars'
          checkList={rest.stars}
          handleFilters={handleFilters}
        />
      </Drawer>

      <main className={` ${!open ? classes.content : classes.contentShift} `}>
        <Grid container>
          <Grid item md={8}>
            {loading ? (
              <h4 className='query-danger'>Loading</h4>
            ) : (
              <h4 className='query-danger'>Products</h4>
            )}
            <Button onClick={() => setOpen(!open)} size='small'>
              <FilterListIcon />
              {open ? 'Close' : 'Open'}
            </Button>
          </Grid>
          <Grid item className={classes.pageSort} md={3}>
            <FormControl size='small' className={classes.sort}>
              <InputLabel required>Sort</InputLabel>
              <Select name='sort' value={sort} onChange={handleSort}>
                {sortArr.map((s, i) => (
                  <MenuItem value={s.name} key={i}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size='small' className={classes.pageSize}>
              <InputLabel required>Page Size</InputLabel>
              <Select
                name='items-per-page'
                value={itemsPerPage}
                onChange={handleItemsPerPage}
              >
                {pageSizes.map((p, i) => (
                  <MenuItem value={p} key={i}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {products.length < 1 && <p>No products found</p>}
        <div className={classes.grid}>
          {products.map((p) => (
            <div key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <Grid container justify='center' className={classes.pagination}>
          <Pagination
            page={currentPage}
            count={Math.ceil(productsCount / itemsPerPage)}
            onChange={(e, value) => setCurrentPage(value)}
            disabled={currentPage === 1 && products.length < itemsPerPage}
            hideNextButton={products.length < itemsPerPage}
          />
        </Grid>
      </main>
    </div>
  );
};

export default Shop;
