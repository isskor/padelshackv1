import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 0 0px 1.5px rgba(0,0,0, 20%)',
    // padding: '1rem',
    maxWidth: '700px',
    borderRadius: '0',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  image: {
    width: '240px',
    // height: '100%',
    objectFit: 'cover',
  },
  imageCtn: {
    // flex: 0.3,
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  quantityForm: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'flex-end',
    '& .MuiTextField-root': {
      width: '10ch',
      margin: '0',
    },
  },
  quantitySave: {
    marginTop: '',
    display: 'inline-block',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}));
const ProductCardInCheckout = ({ product }) => {
  const dispatch = useDispatch();
  const [newQuantity, setNewQuantity] = useState(`${product.count}`);

  const handleQuantityChange = (e) => {
    e.preventDefault();
    let newCount = parseInt(newQuantity);
    let count = newCount < 1 || isNaN(newCount) ? 1 : newCount;

    setNewQuantity(`${count}`);
    if (count > product.quantity) {
      toast.error(`Max available quantity : ${product.quantity}`);
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, count },
    });
  };

  const handleRemove = (e) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });
  };

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.imageCtn}>
        {product.images && product.images[0]?.url && (
          <img
            src={product.images[0].url}
            alt={product?.title ?? ''}
            className={classes.image}
          />
        )}
      </div>
      <div className={classes.content}>
        <div className='info'>
          <Typography>
            {product.brand.name} - {product.title}
          </Typography>
          <Typography variant='body2'>
            {product.color.map((c) => c.name).join(' / ')}{' '}
          </Typography>
        </div>
        <div className={classes.controls}>
          <form
            className={classes.quantityForm}
            onSubmit={handleQuantityChange}
          >
            <div>
              <InputLabel htmlFor='quantity'>Quantity</InputLabel>
              <TextField
                id='quantity'
                type='text'
                name='quantity'
                value={newQuantity}
                variant='outlined'
                onChange={(e) => setNewQuantity(e.target.value)}
              />
            </div>
            {product.count !== newQuantity && (
              <Button type='submit' className={classes.quantitySave}>
                Save
              </Button>
            )}
          </form>
          <IconButton onClick={handleRemove}>
            <DeleteOutlineIcon fontSize='large' />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default ProductCardInCheckout;
