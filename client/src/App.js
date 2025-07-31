// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import LoginPage from './pages/AdminLogin';
import Dashboard from './pages/Dashboard'; 
import Cart from './components/Cart';
import CategoryPage from './pages/CategoryPage';
import AdminLayout from './components/AdminLayout';
import Checkout from './pages/Checkout';
import UserOrder from './pages/UserOrder';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/adminlogin" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/cart" element={<Cart />} />
          <Route path="/category" element={<CategoryPage />} />
           <Route path="/*" element={<AdminLayout />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/userorder" element={<UserOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
