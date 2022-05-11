import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getColor, updateColor } from '../../../api/color';

const ColorUpdate = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  const loadColor = useCallback(() => {
    return getColor(slug).then((c) => {
      setName(c.data.color.name);
    });
  }, [slug]);

  useEffect(() => {
    loadColor();
  }, [loadColor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateColor(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(res.data.name + ' is updated');
        history.push('/admin/color');
      })
      .catch((err) => {
        // console.log(err);
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

export default ColorUpdate;
