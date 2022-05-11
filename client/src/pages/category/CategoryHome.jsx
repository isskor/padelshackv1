import { getCategory } from '../../api/categories';

import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({ match }) => {
  const [category, setCateogry] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      setCateogry(c.data.category);
      setProducts(c.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='jumbotron text-center p-3 my-5 display-4'>
              Loading
            </h4>
          ) : (
            <h4 className='jumbotron text-center p-3 my-5 display-4'>
              {products.length} Products in {category.name}
            </h4>
          )}
        </div>
      </div>
      <div className='row'>
        {products.map((p) => (
          <div className='col-md-4' key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
