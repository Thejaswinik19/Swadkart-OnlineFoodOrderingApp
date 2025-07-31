// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Logo and Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <span className="ms-3" style={{color: 'yellow'}}>SwadKart</span>
        </Link>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-4">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/userorder">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/category">Category</Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="ms-auto">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
