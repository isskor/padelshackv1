import React, { useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../api/auth';
import { Button, Container, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5rem 0',
    height: 'calc(100vh - 68px)',
  },
  paper: {
    padding: '2rem',
    margin: '0 auto',
    maxWidth: '500px',
  },
  loginBtn: {
    marginRight: '1rem',
    background: 'white',
    color: 'black',
  },
  googleBtn: {
    background: 'white',
    color: 'blue',
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let intended = history.location.state;

  useEffect(() => {
    if (intended) return;
    if (user && user.token) history.push('/');
  }, [user, history, intended]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      return history.push('/admin/dashboard');
    }
    // redirect from prev. page
    if (intended) {
      return history.push(intended.from);
    }

    return history.push('/user/history');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      // send to backend to
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              _id: res.data._id,
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              token: idTokenResult.token,
            },
          });

          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err.message));

      // rolebased redirect
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                _id: res.data._id,
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err.message));
        setLoading(false);
        history.push('/');
      })

      .catch((err) => console.log(err));
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label='Email'
        value={email}
        placeholder='Please enter your email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        label='Password'
        type='password'
        value={password}
        placeholder='Please enter your password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type='submit'
        variant='contained'
        disabled={!email || password.length < 6}
        classes={{
          root: classes.loginBtn,
          disabled: classes.disabledBtn,
        }}
      >
        Log in
      </Button>
      <Button
        type='submit'
        variant='contained'
        onClick={googleLogin}
        className={classes.googleBtn}
      >
        Log in with google
      </Button>
    </form>
  );
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        {!loading ? <h4>Login</h4> : <h4>loading...</h4>}
        {loginForm()}

        <Link to='/forgot/password'> Forgot Password </Link>
      </Paper>
    </Container>
  );
};

export default Login;
