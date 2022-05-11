import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '../forms/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  listItem: {
    padding: '0 1rem',
  },
  label: {
    display: 'inline-block',
    width: '100%',
    margin: 0,
  },
}));
const CollapseStar = ({ type, handleFilters, checkList }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  // const [localList, setLocalList] = useState([]);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleList = (e) => {
    let star = parseInt(e.target.value);
    let newList;
    if (checkList?.includes(star)) {
      newList = checkList.filter((c) => c !== star);
    } else {
      newList = [...checkList, star];
    }
    // setLocalList(newList);
    // setFilters({ ...filters, [type]: newList });
    handleFilters({ [type]: newList });
  };

  return (
    <>
      <ListItem button onClick={handleClick} divider>
        <ListItemIcon>
          <StarBorderIcon />
        </ListItemIcon>
        <ListItemText primary={'Rating'} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {[1, 2, 3, 4, 5].map((s) => (
            <ListItem key={s} className={classes.listItem}>
              <FormControlLabel
                className={classes.label}
                control={
                  <Checkbox
                    onChange={handleList}
                    edge='start'
                    checked={checkList?.includes(parseInt(s))}
                    tabIndex={-1}
                    value={s}
                    disableRipple
                  />
                }
                label={<Star numberOfStars={s} />}
              ></FormControlLabel>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapseStar;
