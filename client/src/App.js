import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './api/auth';

import { makeStyles } from '@material-ui/core';
import GlobalStyles from './GlobalStyles';

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
// import Header from './components/nav/Header';
// const Shop = lazy(() => import('./pages/Shop'));
// const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
// const ShopFilters = lazy(() => import('./components/forms/ShopFilters.jsx'));

const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const Password = lazy(() => import('./pages/user/Password'));
const WishList = lazy(() => import('./pages/user/WishList'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
  import('./pages/admin/productOptions/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
  import('./pages/admin/productOptions/CategoryUpdate')
);
const SubCreate = lazy(() => import('./pages/admin/productOptions/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/productOptions/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/Payment'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ColorCreate = lazy(() =>
  import('./pages/admin/productOptions/ColorCreate')
);
const ColorUpdate = lazy(() =>
  import('./pages/admin/productOptions/ColorUpdate')
);
const BrandsCreate = lazy(() =>
  import('./pages/admin/productOptions/BrandsCreate')
);
const BrandsUpdate = lazy(() =>
  import('./pages/admin/productOptions/BrandsUpdate')
);
const Navbar = lazy(() => import('./components/nav/Navbar'));
const CartDrawer = lazy(() => import('./components/drawer/CartDrawer'));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.MuiPickersSlideTransition-transitionContainer.MuiPickersCalendarHeader-transitionContainer': {
      order: -1,
    },
    '.MuiTypography-root.MuiTypography-body1.MuiTypography-alignCenter': {
      fontWeight: 'bold',
    },
  },
  app: {
    backgroundColor: '#fafafa',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <div className={classes.app}>
          <GlobalStyles />
          <Navbar />
          {/* <Header /> */}
          {/* <SideDrawer /> */}
          <CartDrawer />
          <ToastContainer />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route
              exact
              path='/register/complete'
              component={RegisterComplete}
            />
            <Route exact path='/forgot/password' component={ForgotPassword} />
            <UserRoute exact path='/user/history' component={History} />
            <UserRoute exact path='/user/password' component={Password} />
            <UserRoute exact path='/user/wishlist' component={WishList} />
            <AdminRoute
              exact
              path='/admin/dashboard'
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path='/admin/category'
              component={CategoryCreate}
            />
            <AdminRoute
              exact
              path='/admin/category/:slug'
              component={CategoryUpdate}
            />
            <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
            <AdminRoute exact path='/admin/sub' component={SubCreate} />
            <AdminRoute exact path='/admin/color' component={ColorCreate} />
            <AdminRoute
              exact
              path='/admin/color/:slug'
              component={ColorUpdate}
            />
            <AdminRoute exact path='/admin/brand' component={BrandsCreate} />
            <AdminRoute
              exact
              path='/admin/brand/:slug'
              component={BrandsUpdate}
            />
            <AdminRoute exact path='/admin/product' component={ProductCreate} />
            <AdminRoute exact path='/admin/products' component={AllProducts} />
            <AdminRoute
              exact
              path='/admin/product/:slug'
              component={ProductUpdate}
            />
            <AdminRoute exact path='/admin/coupon' component={CreateCoupon} />
            <Route exact path='/product/:slug' component={Product} />
            <Route exact path='/category/:slug' component={CategoryHome} />
            <Route exact path='/sub/:slug' component={SubHome} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/cart' component={Cart} />
            <UserRoute exact path='/checkout' component={Checkout} />
            <UserRoute exact path='/payment' component={Payment} />
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
