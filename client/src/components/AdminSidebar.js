// src/components/AdminSidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // or your token key
    navigate('/');
  };

  return (
    <div>
      <img src={logo} alt="App Logo" className="app-logo" />
      <h3 className="mb-4">Admin Panel</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/adminhome" className="nav-link text-dark">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/adminfoods" className="nav-link text-dark">Manage Foods</Link>
        </li>
        <li className="nav-item">
          <Link to="/adminorders" className="nav-link text-dark">Orders</Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link text-dark">Users</Link>
        </li>
        <li className="nav-item">
  <Link to="/analytics" className="nav-link text-dark">Analytics</Link>
</li>

      </ul>

      <button
        onClick={handleLogout}
        className="btn btn-dark text-warning mt-4 w-100"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
