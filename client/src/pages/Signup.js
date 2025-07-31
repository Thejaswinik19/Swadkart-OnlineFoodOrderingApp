import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link here
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      setMessage(res.data.msg);
      setSuccess(true);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error during signup');
      setSuccess(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Account</h2>

        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

        <button type="submit">Sign Up</button>

        {message && <p className="message">{message}</p>}

        {success && (
          <button
            type="button"
            className="signin-button"
            onClick={() => navigate('/signin')}
          >
            Now you can Sign In
          </button>
        )}

        {/* Already have account link */}
        <p className="already-account-text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
