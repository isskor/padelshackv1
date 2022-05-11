import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  slider: {
    width: '90%',
    margin: '0 auto',
  },
}));
const CollapseSlider = ({ v, handleChange, title }) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick} divider>
        <ListItemIcon>
          <AttachMoneyOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem>
            <Slider
              value={v}
              className={classes.slider}
              onChange={handleChange}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              //   getAriaValueText={() => value}
              max={300}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default CollapseSlider;
