import React, { useState } from 'react';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
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

const Register = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    // send to firebase
    await auth.sendSignInLinkToEmail(email, config);
    // notify user with toast
    toast.success(
      `Email is sent ${email}. Click the link to complete registration`
    );

    // save user email in local storage
    window.localStorage.setItem('emailForRegistration', email);

    // clear state
    setEmail('');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label='Email'
        value={email}
        placeholder='Please enter your email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type='submit'
        variant='contained'
        disabled={!email}
        classes={{
          root: classes.loginBtn,
          disabled: classes.disabledBtn,
        }}
      >
        Verify Email
      </Button>
    </form>
  );
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <h4>Register</h4>
        {registerForm()}
      </Paper>
    </Container>
  );
};

export default Register;
