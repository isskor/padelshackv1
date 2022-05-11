import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createColor, getColors, removeColor } from '../../../api/color';
import CategoryForm from '../../../components/forms/CategoryForm';
import SearchFilterInput from '../../../components/forms/SearchFilterInput';
import AdminProductOptionCards from '../../../components/cards/AdminProductOptionCards';

const ColorCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const user = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = () => {
    return getColors().then((c) => setColors(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createColor({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(res.data.name + ' is created');
        loadColors();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleDelete = (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeColor(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadColors();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      Create Color
      <h1>{loading ? 'loading' : 'create'}</h1>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
      <SearchFilterInput keyword={keyword} setKeyword={setKeyword} />
      <AdminProductOptionCards
        list={colors.filter(searched(keyword))}
        keyword={keyword}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ColorCreate;
