import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getSub, updateSub } from '../../../api/sub';
import { getCategories } from '../../../api/categories';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCat, setParentCat] = useState('');
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  const loadSub = useCallback(() => {
    return getSub(slug).then((s) => {
      setParentCat(s.data.sub.parent);
      setName(s.data.sub.name);
    });
  }, [slug]);

  const loadCategories = () => {
    return getCategories().then((c) => setCategories(c.data));
  };

  useEffect(() => {
    loadSub();
    loadCategories();
  }, [loadSub]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parentCat }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(res.data.name + ' is updated');
        history.push('/admin/sub');
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
      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          className='form-control'
          value={parentCat}
          onChange={(e) => setParentCat(e.target.value)}
        >
          <option>Please Select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option
                key={c._id}
                value={c._id}
                defaultValue={c._id === parentCat}
              >
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default SubUpdate;
