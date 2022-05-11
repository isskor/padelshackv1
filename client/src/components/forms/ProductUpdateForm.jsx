import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '700px',
  },
  multiline: {
    width: '100%',
    height: 'auto',
  },
}));

const shapes = ['Round', 'Diamond', 'Teardrop'];

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subCategories,
  setValues,
  categories,
  colors,
  brands,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    quantity,
    color,
    brand,
    shape,
    weight,
  } = values;
  const classes = useStyles();

  const handleSort = (a, b) => {
    return a.name < b.name ? -1 : 1;
  };
  return (
    <form onSubmit={handleSubmit} noValidate className={classes.root}>
      <TextField
        type='text'
        label='Title'
        name='title'
        variant='outlined'
        value={title}
        onChange={handleChange}
      />
      <TextField
        type='text'
        label='Description'
        name='description'
        variant='outlined'
        value={description}
        multiline
        onChange={handleChange}
        required
        className={classes.multiline}
        rows={10}
      />

      <TextField
        type='text'
        name='price'
        label='Price'
        value={price}
        onChange={handleChange}
        required
      />

      <TextField
        type='number'
        name='quantity'
        value={quantity}
        label='Quantity Stock'
        onChange={handleChange}
        required
      />

      {category && categories.length > 0 && (
        <FormControl>
          <InputLabel required>Category</InputLabel>
          <Select
            name='category'
            value={category._id || category}
            onChange={handleCategoryChange}
            defaultValue=''
          >
            {categories.sort(handleSort).map((c) => (
              <MenuItem value={c._id} key={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {subs && subCategories.length > 0 && (
        <FormControl>
          <InputLabel id='subs'>Sub Categories</InputLabel>
          <Select
            labelId='SubCategory'
            multiple
            required
            value={subs.map((s) => s._id || s)}
            name='color'
            onChange={(e) => setValues({ ...values, color: e.target.value })}
            input={<Input />}
          >
            {subCategories.sort(handleSort).map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {brand && brands.length > 0 && (
        <FormControl>
          <InputLabel required>Brands</InputLabel>
          <Select
            name='brand'
            value={brand._id || brand}
            onChange={handleChange}
          >
            {brands.sort(handleSort).map((b) => (
              <MenuItem value={b._id} key={b._id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {color && colors.length > 0 && (
        <FormControl>
          <InputLabel id='color'>Colors</InputLabel>
          <Select
            labelId='color'
            multiple
            required
            value={color.map((c) => c._id || c)}
            name='color'
            onChange={(e) => setValues({ ...values, color: e.target.value })}
            input={<Input />}
          >
            {colors.sort(handleSort).map((c, i) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl>
        <InputLabel>Shape</InputLabel>
        <Select value={shape} name='shape' onChange={handleChange}>
          {shapes.sort(handleSort).map((shape) => (
            <MenuItem value={shape} key={shape}>
              {shape}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type='text'
        name='weight'
        value={weight}
        label='Weight in grams'
        onChange={handleChange}
      />

      <Button variant='contained' type='submit' size='large'>
        Update
      </Button>
    </form>
  );
};

export default ProductUpdateForm;
