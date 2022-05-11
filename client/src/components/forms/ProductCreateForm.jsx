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

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subCategories,
  setValues,
  colorsArr,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    quantity,
    brands,
    color,
    brand,
    weight,
    shape,
  } = values;
  const classes = useStyles();
  const shapes = ['Round', 'Diamond', 'Teardrop'];

  const handleSort = (a, b) => {
    return a.name < b.name ? -1 : 1;
  };

  const checkDisabled = () => {
    if (
      values?.brand?.length < 1 ||
      values?.category?.length < 1 ||
      values?.price?.length < 1 ||
      values.images.length < 1 ||
      values.title?.length < 1 ||
      values?.description?.length < 1 ||
      values?.quantity?.length < 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate>
      <TextField
        type='text'
        label='Title'
        name='title'
        value={title}
        onChange={handleChange}
        required
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
        // variant='outlined'
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

      <FormControl>
        <InputLabel required>Category</InputLabel>
        <Select
          name='category'
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.sort(handleSort).map((c) => (
            <MenuItem value={c._id} key={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {subCategories.length > 0 && (
        <FormControl>
          <InputLabel>Sub Categories</InputLabel>
          <Select
            multiple
            value={subs}
            onChange={(e) => setValues({ ...values, subs: e.target.value })}
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

      <FormControl>
        <InputLabel id='color'>Colors</InputLabel>
        <Select
          labelId='color'
          multiple
          required
          value={color}
          name='color'
          onChange={(e) => setValues({ ...values, color: e.target.value })}
          input={<Input />}
        >
          {colorsArr.sort(handleSort).map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel required>Brand</InputLabel>
        <Select value={brand} name='brand' onChange={handleChange}>
          {brands.sort(handleSort).map((b) => (
            <MenuItem value={b._id} key={b._id}>
              {b.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={checkDisabled()}
      >
        Create
      </Button>
    </form>
  );
};

export default ProductCreateForm;
