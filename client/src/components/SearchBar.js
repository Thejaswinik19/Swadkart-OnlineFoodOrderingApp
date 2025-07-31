import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default SearchBar;
