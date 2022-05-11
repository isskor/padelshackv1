import StarRating from 'react-star-ratings';

export const AvgRatings = (p, size = '20px') => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((acc, cur) => acc + cur, 0);

    let highest = length * 5; // highest possible rating

    let result = (totalReduced * 5) / highest; // avg
    return (
      <div>
        <span>
          <StarRating
            rating={result}
            starDimension={size}
            starSpacing='2px'
            starRatedColor='red'
          />
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
