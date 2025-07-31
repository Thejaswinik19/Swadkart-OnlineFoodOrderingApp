import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, ShoppingCart, DollarSign, Utensils, Store } from "lucide-react";

function DashboardHome() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    revenue: 0,
    totalUsers: 0,
    totalFoods: 0,
    totalRestaurants: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard summary");
      }
    };

    fetchSummary();
  }, []);

  const cardStyle = {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const textStyle = { color: "black" };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "600", marginBottom: "24px", color: "white" }}>
        📊 Admin Dashboard
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
        <div style={cardStyle}>
          <ShoppingCart size={32} style={{ color: "green" }} />
          <div>
            <p style={textStyle}>Total Orders</p>
            <h2 style={{ ...textStyle, fontSize: "20px", fontWeight: "bold" }}>{summary.totalOrders}</h2>
          </div>
        </div>

        <div style={cardStyle}>
          <DollarSign size={32} style={{ color: "goldenrod" }} />
          <div>
            <p style={textStyle}>Total Revenue</p>
            <h2 style={{ ...textStyle, fontSize: "20px", fontWeight: "bold" }}>₹{summary.revenue}</h2>
          </div>
        </div>

        <div style={cardStyle}>
          <Users size={32} style={{ color: "royalblue" }} />
          <div>
            <p style={textStyle}>Users</p>
            <h2 style={{ ...textStyle, fontSize: "20px", fontWeight: "bold" }}>{summary.totalUsers}</h2>
          </div>
        </div>

        <div style={cardStyle}>
          <Utensils size={32} style={{ color: "deeppink" }} />
          <div>
            <p style={textStyle}>Foods</p>
            <h2 style={{ ...textStyle, fontSize: "20px", fontWeight: "bold" }}>{summary.totalFoods}</h2>
          </div>
        </div>

        <div style={cardStyle}>
          <Store size={32} style={{ color: "purple" }} />
          <div>
            <p style={textStyle}>Restaurants</p>
            <h2 style={{ ...textStyle, fontSize: "20px", fontWeight: "bold" }}>{summary.totalRestaurants}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
