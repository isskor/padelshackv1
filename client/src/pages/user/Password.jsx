import { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    minHeight: '100vh',
    '& .MuiGrid-item': {
      // padding: 0,
    },
  },
  nav: {
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    // marginRight: '1rem',
  },
  content: {
    // margin: '1rem',
    padding: '1rem',
  },
}));

const Password = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success('Password updated');
        setPassword('');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label='New Password'
        value={password}
        type='password'
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type='submit'
        variant='contained'
        disabled={!password || password.length < 6 || loading}
      >
        Update
      </Button>
    </form>
  );

  return (
    <Grid container className={classes.root}>
      <Grid item sm={3} md={2} className={classes.nav}>
        <UserNav />
      </Grid>
      <Grid item xs={12} sm={9} className={classes.content}>
        <Container>
          {loading ? <h4>loading</h4> : <h4>Update Password</h4>}
          {passwordUpdateForm()}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Password;
