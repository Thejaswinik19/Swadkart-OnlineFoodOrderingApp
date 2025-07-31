import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      toast.error('Failed to fetch cart.');
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const incrementQty = async (index) => {
    if (!user) return toast.error('Please login to update cart');
    setLoading(true);
    const item = cartItems[index];
    const newQuantity = item.quantity + 1;
    const foodId = (item.foodId._id || item.foodId).toString();

    try {
      await axios.put(`http://localhost:5000/api/cart/${user._id}/update`, {
        foodId,
        quantity: newQuantity,
      });
      await fetchCart();
    } catch (err) {
      console.error('Failed to increment quantity:', err);
      toast.error('Error updating cart');
    }
    setLoading(false);
  };

  const decrementQty = async (index) => {
    if (!user) return toast.error('Please login to update cart');
    setLoading(true);
    const item = cartItems[index];
    const newQuantity = item.quantity - 1;
    const foodId = (item.foodId._id || item.foodId).toString();

    try {
      if (newQuantity > 0) {
        await axios.put(`http://localhost:5000/api/cart/${user._id}/update`, {
          foodId,
          quantity: newQuantity,
        });
      } else {
        await axios.delete(`http://localhost:5000/api/cart/${user._id}/remove/${foodId}`);
      }
      await fetchCart();
    } catch (err) {
      console.error('Failed to decrement quantity:', err);
      toast.error('Error updating cart');
    }
    setLoading(false);
  };

  const removeItem = async (foodId) => {
    if (!user) return toast.error('Please login to update cart');
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/cart/${user._id}/remove/${foodId}`);
      toast.success('Item removed from cart');
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
      toast.error('Failed to remove item');
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mt-5">
        <h2 className="mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price (each)</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.foodId._id || item.foodId}>
                    <td>
                      <img
                        src={
                          item.imageUrl.startsWith('http')
                            ? item.imageUrl
                            : `http://localhost:5000/images/${item.imageUrl}`
                        }
                        alt={item.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() => decrementQty(index)}
                          disabled={loading}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary ms-2"
                          onClick={() => incrementQty(index)}
                          disabled={loading}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(item.foodId._id || item.foodId)}
                        disabled={loading}
                      >
                        ✖ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <h4>Total: ₹{calculateTotal().toFixed(2)}</h4>
              <button className="btn btn-dark mt-3" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
