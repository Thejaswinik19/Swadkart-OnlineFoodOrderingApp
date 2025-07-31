import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryFoodCard from './CategoryFoodCard';
import './TopOrderedRecipes.css'; // ✅ Add this new CSS file

const TopOrderedRecipes = () => {
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/top-ordered');
        setTopFoods(res.data);
      } catch (err) {
        console.error('Failed to fetch top ordered foods:', err);
      }
    };

    fetchTopFoods();
  }, []);

  return (
    <div className="top-recipes-container">
      <h2 className="top-recipes-title">🔥 Top Ordered Recipes</h2>
      <div className="top-recipes-grid">
        {topFoods.map((food) => (
          <div key={food._id} className="top-recipes-card">
            <CategoryFoodCard food={food} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopOrderedRecipes;
