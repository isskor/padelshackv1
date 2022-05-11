import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProduct, getRelated, productStar } from '../api/product';
import ProductCard from '../components/cards/ProductCard';
import SingleProduct from '../components/cards/SingleProduct';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
  },
  related: {
    padding: '2rem 0',
  },
  relatedTitle: {
    padding: '2rem 0',
  },
  relatedContent: {
    padding: '2rem 0',
  },
}));

const Product = ({ match }) => {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { slug } = match.params;
  const user = useSelector((state) => state.user);

  const loadSingleProduct = useCallback(
    () =>
      getProduct(slug).then(async (res) => {
        setProduct(res.data);
        getRelated(res.data._id).then((res) => setRelated(res.data));
      }),
    [slug]
  );
  useEffect(() => {
    loadSingleProduct();
  }, [loadSingleProduct]);

  useEffect(() => {
    if (product.ratings && user) {
      // check if user had previous put rating
      let existingRatingObject = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.ratings, user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        loadSingleProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.root}>
      <Box>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </Box>
      <Box className={classes.related}>
        <Divider />
        <Typography
          variant='h4'
          align='center'
          component='h3'
          className={classes.relatedTitle}
        >
          Related products
        </Typography>
        <Divider />
        <Grid
          container
          justify='space-around'
          className={classes.relatedContent}
        >
          {related.length ? (
            related.map((r) => (
              <Grid key={r._id} item>
                <ProductCard product={r} />
              </Grid>
            ))
          ) : (
            <div className='text-center col'>No related products</div>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Product;
