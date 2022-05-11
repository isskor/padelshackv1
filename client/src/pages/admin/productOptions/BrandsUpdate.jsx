import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getBrand, updateBrand } from '../../../api/brand';

const BrandUpdate = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  const loadBrand = useCallback(() => {
    return getBrand(slug).then((c) => {
      setName(c.data.brand.name);
    });
  }, [slug]);

  useEffect(() => {
    loadBrand();
  }, [loadBrand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateBrand(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(res.data.name + ' is updated');
        history.push('/admin/brand');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      Update Brand
      <h1>{loading ? 'loading' : 'update'}</h1>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default BrandUpdate;
