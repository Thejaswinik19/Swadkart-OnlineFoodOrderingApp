import React from 'react';

const RatingFilter = ({ minRating, setMinRating }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Minimum Rating</label>
      <select
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value={0}>All Ratings</option>
        <option value={4.5}>4.5 & above</option>
        <option value={4.0}>4.0 & above</option>
        <option value={3.5}>3.5 & above</option>
        <option value={3.0}>3.0 & above</option>
      </select>
    </div>
  );
};

export default RatingFilter;

