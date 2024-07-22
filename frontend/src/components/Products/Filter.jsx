import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCategoriesAsync } from '../../redux/categorySlice/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const Filter = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  console.log(categories);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);


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
        {categories.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
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