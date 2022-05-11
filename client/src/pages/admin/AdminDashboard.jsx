import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeStatus, getOrders } from '../../api/admin';
import { toast } from 'react-toastify';
import OrderTable from '../../components/order/OrderTable';
import SearchFilterInput from '../../components/forms/SearchFilterInput';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState('');

  const loadOrders = useCallback(
    () => getOrders(user.token).then((res) => setOrders(res.data)),
    [user.token]
  );

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Status updated');
      loadOrders();
    });
  };

  const searched = (keyword) => (c) =>
    c._id.toLowerCase().includes(keyword) ||
    c.orderedBy.toLowerCase().includes(keyword);

  return (
    <div>
      <h4>admin sidbar</h4>
      <SearchFilterInput
        keyword={keyword}
        setKeyword={setKeyword}
        label='Search By OrderId or UserId'
      />

      <OrderTable
        orders={orders.filter(searched(keyword))}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminDashboard;
