// src/pages/Dashboard.js
//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import Navbar from '../components/Navbar';
import CarouselComp from '../components/Carousel';
import TopOrderedRecipes from '../components/TopOrderedRecipes';
import './Dashboard.css';

const Dashboard = () => {
 // const [foods, setFoods] = useState([]);

 // useEffect(() => {
   // axios.get('http://localhost:5000/api/food')
    //  .then((res) => setFoods(res.data))
    //  .catch((err) => console.log(err));
 // }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="welcome-heading text-center mb-4">
  Welcome, {user?.name}!<br />
  <span className="welcome-subtext">
    We’re thrilled to serve you delicious recipes and fast delivery—right at your fingertips.
  </span>
</h2>


        <CarouselComp />
        <TopOrderedRecipes />

        {/* Removed section:
        <h3 className="mt-4">Delicious Dishes You Can't Resist</h3>
        <div className="row">
          {foods.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <FoodCard food={item} />
            </div>
          ))}
        </div>
        */}
        
      </div>
    </>
  );
};

export default Dashboard;
