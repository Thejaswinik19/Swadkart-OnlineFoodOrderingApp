import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PriceSlider from '../components/PriceSlider';
import RestaurantFilter from '../components/RestaurantFilter';
import RatingFilter from '../components/RatingFilter';
import CategoryFoodCard from '../components/CategoryFoodCard';
import Navbar from '../components/Navbar';
const CategoryPage = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [restaurant, setRestaurant] = useState('');

  useEffect(() => {
    fetchFoods();
  }, [search, category, vegOnly, minPrice, maxPrice, restaurant, minRating]);

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category-foods', {
        params: {
          search,
          category,
          veg: vegOnly,
          minPrice,
          maxPrice,
          restaurant,
          minRating,
        },
      });
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  return (
    <>
     <Navbar />
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-warning text-dark p-4">
          <h2 className="mb-4 border-bottom pb-2">Filters</h2>
          <SearchBar search={search} setSearch={setSearch} />
          <CategoryFilter setCategory={setCategory} />
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="vegOnly"
              checked={vegOnly}
              onChange={() => setVegOnly(!vegOnly)}
              style={{ borderRadius: '8px' }}
            />
            <label className="form-check-label" htmlFor="vegOnly">
              Veg Only
            </label>
          </div>
          <PriceSlider min={minPrice} max={maxPrice} setMin={setMinPrice} setMax={setMaxPrice}  />
          <RestaurantFilter setRestaurant={setRestaurant} />
          <RatingFilter minRating={minRating} setMinRating={setMinRating} />
        </div>

        {/* Main content */}
        <div className="col-md-9 p-4 bg-light">
          <h1 className="mb-4 border-bottom pb-2 text-dark">Available Foods</h1>
          {foods.length === 0 ? (
            <p className="text-muted text-center mt-5">No food items match your filters.</p>
          ) : (
            <div className="row">
              {foods.map((food) => (
                <div key={food._id} className="col-md-4 mb-4">
                  <CategoryFoodCard food={food} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CategoryPage;
