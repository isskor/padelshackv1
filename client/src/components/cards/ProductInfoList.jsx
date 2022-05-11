import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  list: {
    listStyle: 'none',
    padding: '0',
    marginTop: '2rem',
  },
  details: {
    padding: '0.5rem 0',
    borderBottom: '1px solid rgba(0,0,0, 15%)',
  },
  listItem: {
    display: 'flex',
    padding: '0.5rem 0',
    borderBottom: '1px solid rgba(0,0,0, 5%)',
  },
  listTitle: {
    flexGrow: 1,
  },
}));
const ProductInfoList = ({ product }) => {
  const { category, subs, color, brand, weight, shape } = product;

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch({ type: 'FILTER_CATEGORY', payload: category });
  };

  const handleSubCategoryClick = (sub) => {
    dispatch({ type: 'FILTER_SUB', payload: sub });
  };

  return (
    <ul className={classes.list}>
      <Typography variant='h6' className={classes.details}>
        Details
      </Typography>
      {category && (
        <li className={classes.listItem}>
          <Typography className={classes.listTitle}>Category</Typography>
          <Link
            to={`/shop?${category.slug}`}
            onClick={() => handleCategoryClick(category._id)}
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && subs.length > 0 && (
        <li className={classes.listItem}>
          <Typography className={classes.listTitle}>Sub Category</Typography>
          {subs.map((s, i) => (
            <div key={s._id}>
              <Link
                to={`/shop?${s.slug}`}
                onClick={() => handleSubCategoryClick(s._id)}
              >
                {s.name}
              </Link>
              {i === subs.length - 1 ? '' : '  /  '}
            </div>
          ))}
        </li>
      )}
      {color && color.length > 0 && (
        <li className={classes.listItem}>
          <Typography className={classes.listTitle}>Color</Typography>
          {color &&
            color.map((c, index) => (
              <>
                <Typography variant='body2' key={c._id}>
                  {c.name}
                  {index < color.length - 1 ? '/' : ''}
                </Typography>
              </>
            ))}
        </li>
      )}
      <li className={classes.listItem}>
        <Typography className={classes.listTitle}>Brand</Typography>
        <Typography variant='body2'>{brand && brand.name}</Typography>
      </li>
      {shape && (
        <li className={classes.listItem}>
          <Typography className={classes.listTitle}>Shape</Typography>
          <Typography variant='body2'>{shape}</Typography>
        </li>
      )}
      {weight && (
        <li className={classes.listItem}>
          <Typography className={classes.listTitle}>Weight</Typography>
          <Typography variant='body2'>{weight} grams</Typography>
        </li>
      )}
    </ul>
  );
};

export default ProductInfoList;
