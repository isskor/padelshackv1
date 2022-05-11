import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';

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

const CollapseGroup = ({
  listToLoop,
  title,
  type,
  defaultOpen = false,
  handleFilters,
  checkList,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(defaultOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleList = (e) => {
    let newList;
    if (checkList?.includes(e.target.value)) {
      newList = checkList.filter((c) => c !== e.target.value);
    } else {
      newList = [...checkList, e.target.value];
    }
    // setLocalList(newList);
    handleFilters({ [type]: newList });
  };

  return (
    <>
      <ListItem button onClick={handleClick} divider>
        <ListItemIcon>
          {type === 'category' && <CategoryIcon />}
          {type === 'color' && <ColorLensOutlinedIcon />}
          {type === 'brand' && <FormatColorTextIcon />}
          {type === 'subs' && <CategoryOutlinedIcon />}
          {type === 'shape' && <SportsTennisIcon />}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div'>
          {listToLoop.map((listItem, i) => (
            <ListItem key={listItem._id || i} className={classes.listItem}>
              <FormControlLabel
                className={classes.label}
                control={
                  <Checkbox
                    onChange={handleList}
                    edge='start'
                    checked={checkList?.includes(listItem._id || listItem)}
                    tabIndex={-1}
                    value={listItem._id || listItem}
                    disableRipple
                  />
                }
                label={listItem.name || listItem}
              />
              <ListItemText />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapseGroup;
