import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Button, Container, Paper, TextField } from '@material-ui/core';
import { createOrUpdateUser } from '../../api/auth';
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
}));

const RegisterComplete = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        // remove item from localstorage
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        // set user password and get user id token
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        //   redux store
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
          })
          .catch((err) => console.log(err.message));
        // redirect
        history.push('/');
      }
    } catch (err) {
      // handle error
      //   console.log(err);
      toast.error(err.message);
    }
  };

  const completeRegisterForm = () => (
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
      <TextField
        required
        label='Confirm Password'
        type='password'
        value={password2}
        placeholder='Please enter confirm your password'
        onChange={(e) => setPassword2(e.target.value)}
      />

      <Button
        type='submit'
        variant='contained'
        disabled={!email || password.length < 6 || password !== password2}
        classes={{
          root: classes.loginBtn,
          disabled: classes.disabledBtn,
        }}
      >
        Complete Registration
      </Button>
    </form>
  );
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <h4>Register</h4>
        {completeRegisterForm()}
      </Paper>
    </Container>
  );
};

export default RegisterComplete;
