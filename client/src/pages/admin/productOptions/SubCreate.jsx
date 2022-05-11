import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSub, getSubs, removeSub } from '../../../api/sub';
import { getCategories } from '../../../api/categories';
import CategoryForm from '../../../components/forms/CategoryForm';
import SearchFilterInput from '../../../components/forms/SearchFilterInput';
import AdminProductOptionCards from '../../../components/cards/AdminProductOptionCards';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [parentCat, setParentCat] = useState('');
  const user = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () => {
    return getCategories().then((c) => setCategories(c.data));
  };
  const loadSubs = () => {
    return getSubs().then((s) => setSubs(s.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: parentCat }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        loadSubs();
        toast.success(res.data.name + ' is created');
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      Sub Category Create
      <h1>{loading ? 'loading' : 'create'}</h1>
      <FormControl>
        <InputLabel>Category Parent</InputLabel>
        <Select
          value={parentCat}
          onChange={(e) => setParentCat(e.target.value)}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <MenuItem value={c._id} key={c._id}>
                {c.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
      <SearchFilterInput keyword={keyword} setKeyword={setKeyword} />
      <AdminProductOptionCards
        list={subs.filter(searched(keyword))}
        keyword={keyword}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SubCreate;
