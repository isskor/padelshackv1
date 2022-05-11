import { getSub } from '../../api/sub';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((s) => {
      setSub(s.data.sub);
      setProducts(s.data.products);
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
              {products.length} Products in {sub.name} sub category
            </h4>
          )}
        </div>
      </div>
      <div className='row'>
        {products.map((s) => (
          <div className='col-md-4' key={s._id}>
            <ProductCard product={s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
