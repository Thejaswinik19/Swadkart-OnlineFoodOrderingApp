// src/components/AdminLayout.js
import React from 'react';
import Sidebar from '../components/AdminSidebar';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../pages/AdminDashboardHome';
import FoodManagement from '../pages/AdminFoodManagement';
import OrderManagement from '../pages/AdminOrderManagement';
import UserManagement from '../pages/AdminUserManagement';
import AdminAnalytics from '../pages/AdminAnalytics';
const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-warning text-dark p-4">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 bg-dark text-light p-4">
          <Routes>
            <Route path="/adminhome" element={<DashboardHome />} />
            <Route path="/adminfoods" element={<FoodManagement />} />
            <Route path="/adminorders" element={<OrderManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
