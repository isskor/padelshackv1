import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../api/categories';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
        key={c._id}
      >
        <Link to={`/category/${c.slug}`} className='w-100 d-block'>
          {c.name}
        </Link>
      </div>
    ));

  return (
    <div className='contianer'>
      <div className='row'>
        {loading ? (
          <h4 className='text-center'> Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
