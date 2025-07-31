import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import pizza from '../assets/pizza.png';
import burger from '../assets/burger.png';
import biryani from '../assets/chickenBiryani.png';
import logo from '../assets/logo.png';
import TopOrderedRecipes from '../components/TopOrderedRecipes';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate(); // 👈 Hook for navigation

  return (
    <div className="landing-container">
      <div className="top-bar">
        <img src={logo} alt="App Logo" className="app-logo" />
        <button className="admin-btn" onClick={() => navigate('/adminlogin')}>Admin</button>
      </div>

      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div className="carousel-slide">
            <img src={pizza} alt="Pizza" />
            <div className="carousel-caption">Hot & Tasty Pizza</div>
          </div>
          <div className="carousel-slide">
            <img src={burger} alt="Burger" />
            <div className="carousel-caption">Juicy Burgers Just for You</div>
          </div>
          <div className="carousel-slide">
            <img src={biryani} alt="Chicken Biryani" />
            <div className="carousel-caption">Spicy & Flavorful Biryani</div>
          </div>
        </Carousel>
      </div>

      <motion.h2 
        className="tagline"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Bringing happiness with <br />
        delicious food is our goal. <span role="img" aria-label="smile">😋</span>
      </motion.h2>

      <motion.p 
        className="description"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.2 }}
      >
        Discover the best meals from your favorite restaurants. <br />
        Fast delivery, hot food, and unbeatable taste – all in one app.
      </motion.p>

      <div className="features">
        <div className="feature-box">🚀 <p>Fast Delivery</p></div>
        <div className="feature-box">🥗 <p>Fresh Ingredients</p></div>
        <div className="feature-box">💳 <p>Easy Payments</p></div>
      </div>

      <div className="testimonials">
        <div className="testimonial-card">
          <p>"Super fast delivery and amazing food!"</p>
          <span>- Anika S.</span>
        </div>
        <div className="testimonial-card">
          <p>"Tastes just like home! Loved the packaging too."</p>
          <span>- Ravi M.</span>
        </div>
      </div>

      <div className="buttons sticky-cta">
        <button className="btn-signup" onClick={() => navigate('/Signup')}>Sign Up</button>
        <button className="btn-signin" onClick={() => navigate('/signin')}>Sign In</button>
      </div>
      <TopOrderedRecipes />
      <footer className="footer">
        <p>© 2025 SwadKart. All rights reserved.</p>
        <a href="/">Terms</a> | <a href="/">Privacy</a>
      </footer>
    </div>
  );
};

export default LandingPage;
