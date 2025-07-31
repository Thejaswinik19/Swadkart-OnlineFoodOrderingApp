import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminOrderManagement.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      toast.error('Failed to fetch orders');
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      toast.success('Status updated');
      fetchOrders(); // Refresh orders
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);

    if (status === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <ToastContainer />
      <h2 className="admin-heading">Order Management</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Filter by Status: </strong></label>
        <select value={filterStatus} onChange={handleFilterChange} className="status-dropdown">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        filteredOrders.map((order, index) => (
          <div key={order._id} className="admin-order-card">
            <div className="admin-order-header">
              <strong>Order #{index + 1}</strong> (ID: {order._id})
            </div>
            <div>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p>
                <strong>Status:</strong>{' '}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="status-dropdown"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
              <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Restaurant</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i}>
                      <td><img
  src={
    item.imageUrl ||
    (item.image
      ? `http://localhost:5000/images/${item.image}`
      : 'https://via.placeholder.com/60')
  }
  alt={item.name}
  className="admin-img"
/></td>
                      <td>{item.name}</td>
                      <td>{item.restaurantName}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderManagement;
