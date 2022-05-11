import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase.js';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    user && user.token && history.push('/');
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);

      setEmail('');
      setLoading(false);
      toast.success('check your email to reset password');
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? <h4>Loading</h4> : <h4>Forgot password</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control my-5'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Please enter your email'
          autoFocus
        />
        <button className='btn btn-raised' disabled={!email}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
