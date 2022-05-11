import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../api/categories';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  const loadCategory = useCallback(() => {
    return getCategory(slug).then((c) => {
      setName(c.data.category.name);
    });
  }, [slug]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(res.data.name + ' is updated');
        history.push('/admin/category');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      Update Category
      <h1>{loading ? 'loading' : 'update'}</h1>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default CategoryUpdate;
