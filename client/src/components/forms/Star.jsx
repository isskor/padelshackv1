import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ starClick, numberOfStars, size = '20px' }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClick && starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension={size}
        starSpacing='2px'
        starHoverColor='red'
        starEmptyColor='red'
      />
      <br />
    </>
  );
};

export default Star;
