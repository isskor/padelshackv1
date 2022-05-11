import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type='submit' variant='contained' color='primary'>
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;
