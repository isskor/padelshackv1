import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../api/auth';
import AdminNav from '../nav/AdminNav';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    minHeight: '100vh',
    '& .MuiGrid-item': {
      // padding: 0,
    },
  },
  adminNav: {
    padding: 0,
    // marginRight: '1rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  adminContent: {
    // margin: '1rem',
    padding: '1rem',
  },
}));

const AdminRoute = ({ children, ...rest }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Grid container className={classes.root}>
      <Grid item sm={3} md={2} className={classes.adminNav}>
        <AdminNav />
      </Grid>
      <Grid item xs={12} sm={9} md={10} className={classes.adminContent}>
        <Route {...rest} />
      </Grid>
    </Grid>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
