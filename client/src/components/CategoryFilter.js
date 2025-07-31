import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryFilter = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/filters');
        setCategories(['All', ...res.data.categories]);
      } catch (err) {
        console.error('Failed to fetch category filters', err);
      }
    };
    fetchFilters();
  }, []);

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">Category</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="form-select"
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat === 'All' ? '' : cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
