import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCoupons, removeCoupon, createCoupon } from '../../../api/coupon';

import { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const useStyles = makeStyles((theme) => ({
  dateInput: {
    width: '200px',
  },
}));

const init = {
  name: '',
  expiry: '',
  discount: '',
};

const CreateCoupon = () => {
  const [coupon, setCoupon] = useState(init);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState('');

  const user = useSelector((state) => state.user);

  const classes = useStyles();

  const loadCoupons = useCallback(() => {
    setLoading(true);
    getCoupons(user.token).then((res) => {
      setCoupons(res.data);
      setLoading(false);
    });
  }, [user.token]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon(coupon, user.token).then((res) => {
      setLoading(false);
      setCoupon(init);
      toast.success(`${res.data.name} is created`);
      loadCoupons();
    });
  };

  function handleChange(e) {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  }

  function handleRemove(id) {
    if (window.confirm('delete?')) {
      setLoading(true);
      removeCoupon(id, user.token).then((res) => {
        getCoupons(user.token)
          .then((res) => {
            toast.error(`Coupon "${res.data.name}" deleted`);
            loadCoupons();
          })
          .catch((err) => console.log(err));
      });
    }
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <h4>Coupon</h4>

      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          label='Name'
          name='name'
          value={coupon.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <TextField
          type='text'
          required
          label='Discount %'
          name='discount'
          value={coupon.discount}
          onChange={handleChange}
        />
        <TextField
          type='date'
          required
          label='Expiration Date'
          value={coupon.expiry}
          className={classes.date}
          InputProps={{
            className: classes.dateInput,
          }}
          onChange={(e) => setCoupon({ ...coupon, expiry: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button type='submit' variant='contained' color='primary'>
          {loading ? 'loading' : 'Save'}
        </Button>
      </form>
      <br />
      <h4>{coupons.length} Coupons</h4>
      <table className='table table-bordered'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Expiry</th>
            <th scope='col'>Discount</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{new Date(c.expiry).toLocaleDateString()}</td>
              <td>{c.discount}%</td>
              <td>
                <DeleteOutlineOutlinedIcon
                  onClick={() => handleRemove(c._id)}
                  className='text-danger pointer'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateCoupon;
