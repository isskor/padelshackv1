import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Grid item key={i}>
          <Skeleton variant='rect' height={300} width={240} />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </Grid>
      );
    }
    return totalCards;
  };

  return (
    <Grid container justify='center' spacing={10}>
      {cards()}
    </Grid>
  );
};

export default LoadingCard;
