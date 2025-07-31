import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { ToastContainer, toast } from 'react-toastify';

const COLORS = ['#facc15', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444'];

const AdminAnalytics = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/top-items');
        setTopItems(res.data);
      } catch (err) {
        toast.error('Failed to load analytics');
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2 className="admin-heading mb-4">Most Ordered Food Items</h2>

      {topItems.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="row">
          {/* Bar Chart */}
          <div className="col-md-6 mb-5">
            <h5 className="text-warning">Bar Chart</h5>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={topItems}
                margin={{ top: 20, right: 40, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" angle={-30} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalQuantity" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="col-md-6 mb-5">
            <h5 className="text-warning">Pie Chart</h5>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={topItems}
                  dataKey="totalQuantity"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {topItems.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
