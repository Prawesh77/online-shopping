
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../../redux/productSlice/productSlice';
// import { addCategory } from '../../redux/categorySlice';
import categories from './categories';
// import categories from '../../data/categories'; // Your existing categories array

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    category: '',
    details: {
      name: '',
      brand: '',
      price: '',
      size: '',
      watt: '',
      description: '',
    },
    instock: '',
    file: {}
  });

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ value: '', label: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const detailName = name.split('.')[1];
      setProduct((prevProduct) => ({
        ...prevProduct,
        details: {
          ...prevProduct.details,
          [detailName]: value,
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', product.category);
    formData.append('details[name]', product.details.name);
    formData.append('details[brand]', product.details.brand);
    formData.append('details[price]', product.details.price);
    formData.append('details[size]', product.details.size);
    formData.append('details[watt]', product.details.watt);
    formData.append('details[description]', product.details.description);
    formData.append('instock', product.instock);
    formData.append('image', product.file);

    try {
      await dispatch(addProduct(formData));
      alert(`${product.details.brand}'s ${product.details.name} added successfully`);
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  const handleAddCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAddCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      // await dispatch(addCategory(newCategory));
      setShowAddCategory(false);
      setNewCategory({ value: '', label: '' });
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add category');
    }
  };

  const handleCancel = () => {
    setShowAddCategory(false);
    setNewCategory({ value: '', label: '' });
  };

  return (
    <div className="add-product-form">
      {!showAddCategory ? (
        <form onSubmit={handleSubmit}>
          <div className="add_category">
            <select name="category" value={product.category} onChange={handleCategoryChange} required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <p onClick={handleAddCategoryClick} style={{ cursor: 'pointer', color: 'blue' }}>
              Add
            </p>
          </div>
          <input
            type="text"
            name="details.name"
            value={product.details.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="details.brand"
            value={product.details.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
          />
          <input
            type="text"
            name="details.size"
            value={product.details.size}
            onChange={handleChange}
            placeholder="Size"
          />
          <input
            type="text"
            name="details.watt"
            value={product.details.watt}
            onChange={handleChange}
            placeholder="Watt"
          />
          <input
            type="text"
            name="details.price"
            value={product.details.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="instock"
            value={product.instock}
            onChange={handleChange}
            placeholder="Quantity"
            min="0"
          />
          <input type="file" onChange={handleFileChange} />

          <button type="submit">Add Product</button>
          <Link to="/products">
            <button type="button">Cancel</button>
          </Link>
        </form>
      ) : (
        <form onSubmit={handleAddCategorySubmit}>
          <input
            type="text"
            name="value"
            value={newCategory.value}
            onChange={handleAddCategoryChange}
            placeholder="Category"
            required
          />
          <input
            type="text"
            name="label"
            value={newCategory.label}
            onChange={handleAddCategoryChange}
            placeholder="Category Name"
            required
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;

