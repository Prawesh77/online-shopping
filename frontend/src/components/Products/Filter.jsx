import { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange(e.target.value, minPrice, maxPrice);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    onFilterChange(category, e.target.value, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    onFilterChange(category, minPrice, e.target.value);
  };

  return (
    <div className="filter-container">
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="3 pin top">3 pin top</option>
        <option value="2 pin top">2 pin top</option>
        <option value="LED Bulb">LED Bulb</option>
        <option value="Tape">Tape</option>
      </select>
      <label>Price From:</label>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <label>to:</label>
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;