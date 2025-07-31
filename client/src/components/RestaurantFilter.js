import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantFilter = ({ setRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/filters');
        setRestaurants(['All', ...res.data.restaurants]);
      } catch (err) {
        console.error('Failed to fetch restaurant filters', err);
      }
    };
    fetchFilters();
  }, []);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Restaurant</label>
      <select
        onChange={(e) => setRestaurant(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {restaurants.map((res, index) => (
          <option key={index} value={res === 'All' ? '' : res}>
            {res}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RestaurantFilter;
