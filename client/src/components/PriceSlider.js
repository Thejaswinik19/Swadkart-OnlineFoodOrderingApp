import React from 'react';

const PriceSlider = ({ min, max, setMin, setMax }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Price Range</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="w-1/2 px-2 py-1 border rounded"
          min="0"
        />
        <span>to</span>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          className="w-1/2 px-2 py-1 border rounded"
          min="0"
        />
      </div>
    </div>
  );
};

export default PriceSlider;
