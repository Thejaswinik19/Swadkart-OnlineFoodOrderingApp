import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/signin', formData);
      setMessage('Login successful!');
      localStorage.setItem('token', res.data.token); // optional
      localStorage.setItem('user', JSON.stringify(res.data.user));
      console.log('User saved:', res.data.user);

      // Navigate to home or dashboard
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error occurred');
    }
  };

  return (
    
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>

        {message && <p className="message">{message}</p>}

        <div className="no-account-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
