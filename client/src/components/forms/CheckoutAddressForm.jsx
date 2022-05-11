import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '90%'
    // margin: '0 auto'
  },
  formBtn: {
    margin: '1rem 0',
    background: '#404444',
    color: 'white',
  },
}));

const CheckoutAddressForm = ({ handleChange, handleSubmit, values }) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <TextField
        type='text'
        name='name'
        label='Name'
        value={values.name}
        onChange={handleChange}
        required
      />
      <TextField
        type='text'
        name='address'
        label='Address'
        value={values.address}
        onChange={handleChange}
        required
      />
      <TextField
        type='text'
        name='addressNumber'
        label='Address Number'
        value={values.addressNumber}
        onChange={handleChange}
        required
      />
      <TextField
        type='text'
        name='zipCode'
        label='Zip Code'
        value={values.zipCode}
        onChange={handleChange}
        required
      />
      <TextField
        type='text'
        name='city'
        label='City'
        value={values.city}
        onChange={handleChange}
        required
      />
      <TextField
        type='text'
        name='country'
        label='Country'
        value={values.country}
        onChange={handleChange}
        required
      />

      <Button variant='contained' className={classes.formBtn} type='submit'>
        Save
      </Button>
    </form>
  );
};

export default CheckoutAddressForm;
