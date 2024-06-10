import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { addProduct, addProductLocal } from "../../redux/productSlice/productSlice";

const Addproductform = () => {
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
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
          if (name.startsWith("details.")) {
            const detailName = name.split(".")[1];
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
      }))
    };
    
    //if product with same name and brand is added , instock value sum huna paryo.... 
    //backend maa garexu as the page refreshes here, if not frontend mai garnu parxa in productslice

    const handleSubmit = async    (e) => {
        e.preventDefault();
        // console.log(product);
        try {
          await dispatch(addProduct(product));
          dispatch(addProductLocal(product));
          // console.log(product);
          alert(`${product.details.brand}'s ${product.details.name} added successfully`);
          // setShowAddProduct(false);
          // window.location.href = '/products';
        } catch (err) {
          console.log('Error adding user:', err);
          alert('Failed to add product');
        }
      };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <select name="category" value={product.category} onChange={handleCategoryChange}>
          <option value="3 pin top">3 pin top</option>
          <option value="2 pin top">2 pin top</option>
          <option value="LED Bulb">LED Bulb</option>
          <option value="Tape">Tape</option>
        </select>
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

        <button type="submit">Add Product</button>
        <Link to="/products">
          <button type="button" >
            Cancel
          </button>
        </Link>
        
      </form>
    </div>
  );
}

export default Addproductform