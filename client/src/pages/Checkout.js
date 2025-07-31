// src/pages/Checkout.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import './Checkout.css';

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const restaurantName = cartItems[0]?.restaurant || 'Unknown';
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate('/signin');
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
      setCartItems(res.data.items || []);
    } catch (err) {
      toast.error('Failed to fetch cart.');
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = async (paymentDetails = {}) => {
  const orderData = {
    userId: user._id,
    name,
    phone,
    address,
    paymentMethod,
    items: cartItems,
    restaurantName,
    paymentInfo: paymentDetails, // ✅ attach Razorpay info here
  };



    try {
      const res = await axios.post('http://localhost:5000/api/orders', orderData);

      if (res.status === 201) {
        toast.success('Order placed successfully!');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error('Order failed. Please try again.');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (razorpayLoaded) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        setRazorpayLoaded(true);
        resolve(true);
      };
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!name || !phone || !address) {
      toast.error('Please fill all fields');
      return;
    }

    if (paymentMethod === 'COD') {
      placeOrder();
    } else {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Failed to load payment gateway');
        return;
      }

      const { data: order } = await axios.post('http://localhost:5000/api/payment/create', {
        amount: calculateTotal(),
      });

      const options = {
        key: 'rzp_test_vvXttIZDOtvHGT', // 🔁 Replace with your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: 'SwadKart',
        description: 'Order Payment',
        order_id: order.id,
        handler: function (response) {
  toast.success('Payment Successful');

  // ✅ Pass Razorpay response to backend
  placeOrder({
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature,
  });
},

        prefill: {
          name,
          email: user?.email,
          contact: phone,
        },
        theme: {
          color: '#f4e755ff',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mt-5">
        <h2 className="mb-4">Checkout</h2>

        <div className="row">
          {/* Billing Form */}
          <div className="col-md-6">
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Delivery Address</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Payment Method</label>
              <select
                className="form-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </div>

            <button className="custom-black-btn " onClick={handlePayment}>
  {paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${calculateTotal()} Now`}
</button>
          </div>

          {/* Cart Summary */}
          <div className="col-md-6">
            <h4 className="mb-3">Order Summary</h4>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <div className="list-group">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="list-group-item d-flex align-items-center">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/60'}
                      alt={item.name}
                      className="me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-0">Qty: {item.quantity}</p>
                    </div>
                    <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <div className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
