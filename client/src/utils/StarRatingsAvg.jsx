import StarRating from 'react-star-ratings';

export const StarRatingsAvg = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((acc, cur) => acc + cur, 0);

    let highest = length * 5; // highest possible rating

    let result = (totalReduced * 5) / highest; // avg
    return (
      <div className='text-center pt-1 pb-3'>
        <span>
          <StarRating rating={result} />
        </span>
      </div>
    );
  }
};
