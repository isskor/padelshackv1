import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    flexGrow: 1,
    paddingTop: '1rem',
  },
  inputRoot: {
    borderRadius: theme.shape.borderRadius * 0.5,
    // backgroundColor: theme.palette.secondary.main,
    color: 'black',
    transition: theme.transitions.create('width'),
    fontSize: '1rem',
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 200, //change it to 250(number)
    },
    '&$inputFocused': {
      [theme.breakpoints.up('sm')]: {
        width: '90%', //change it to 1000(number), it will work fine, but I need percentages.
        borderBottom: '1px solid black',
      },
    },
  },

  inputFocused: {},
}));

const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };
  return (
    <form onSubmit={handleSubmit} className={classes.searchBar}>
      <InputBase
        startAdornment={<SearchIcon />}
        placeholder='Search'
        classes={{
          root: classes.inputRoot,
          focused: classes.inputFocused,
        }}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
