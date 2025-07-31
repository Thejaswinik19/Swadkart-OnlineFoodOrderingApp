// src/pages/UserOrder.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrder.css";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";

const UserOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/${user._id}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusSteps = ["Pending", "Confirmed", "Delivered"];
  const tooltips = {
    Pending: "Your order has been placed.",
    Confirmed: "Your order is confirmed by the restaurant.",
    Delivered: "Your order has been delivered.",
  };

  return (
    <>
      <Navbar />
      <div className="order-container">
        <ToastContainer />
        <h2 className="order-heading">My Orders</h2>
        {orders.length === 0 ? (
          <p className="order-empty">You haven't placed any orders yet.</p>
        ) : (
          orders.map((order, index) => {
            const currentStatusIndex = statusSteps.indexOf(order.status);
            return (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <span className="order-number">
                    <strong>Order #{index + 1}</strong>
                  </span>
                  <span className="order-id">ID: {order._id}</span>
                </div>

                {/* ✅ Status Tracker */}
                <div className="status-tracker">
                  {statusSteps.map((stage, i) => {
                    const isCompleted = currentStatusIndex >= i;
                    return (
                      <div
                        key={i}
                        className={`status-step-wrapper ${
                          isCompleted ? "completed" : ""
                        }`}
                      >
                        <div
                          className={`status-step ${
                            isCompleted ? "completed" : ""
                          }`}
                        >
                          <div className="circle" />
                          <span className="label">{stage}</span>
                          <div className="tooltip">{tooltips[stage]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="order-card-body">
                  <p>
                    <strong>Ordered On:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Contact:</strong> {order.name} - {order.phone}
                  </p>

                  <table className="order-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Restaurant</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="order-img"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.restaurantName || "N/A"}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h5 className="order-total">
                    Total: ₹
                    {order.items
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </h5>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default UserOrder;
