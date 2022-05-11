import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
  image: {
    width: '100%',
    height: '80px',
    objectFit: 'cover',
    flex: 0.3,
    cursor: 'pointer',
  },
  cartBtn: {
    background: '#404444',
    color: 'white',
  },
  card: {
    display: 'flex',
  },
  info: {
    width: '100%',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  controlIcon: {
    color: '#404444',
    marginRight: '0.5rem',
  },
  deleteBtn: {
    marginLeft: 'auto',
    display: 'inline-block',
  },
});

const DrawerItem = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleIncreaseCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product },
    });
  };

  const handleDecreaseCart = (product) => {
    dispatch({
      type: 'DECREASE_FROM_CART',
      payload: product,
    });
  };

  const handeRemoveFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });
  };

  return (
    <Card className={classes.card}>
      {product?.images && product.images[0]?.url && (
        <img
          src={product.images[0]?.url}
          alt={product?.title}
          className={classes.image}
          onClick={() => history.push(`/product/${product?.title}`)}
        />
      )}
      <div className={classes.info}>
        <Typography>{product.title}</Typography>
        <span>Quanity: {product.count}</span>
        <div className={classes.controls}>
          <IconButton
            size='small'
            className={classes.controlIcon}
            onClick={() => handleDecreaseCart(product)}
          >
            <RemoveCircleOutlinedIcon />
          </IconButton>
          <IconButton
            size='small'
            className={classes.controlIcon}
            onClick={() => handleIncreaseCart(product)}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            color='secondary'
            className={classes.deleteBtn}
            onClick={() => handeRemoveFromCart(product)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default DrawerItem;
