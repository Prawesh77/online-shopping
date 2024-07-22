//component to display a single product
import { useSelector, useDispatch } from 'react-redux';
import '../../css/Product.css';
import PropTypes from 'prop-types'
import { addToCartAsync } from '../../redux/CartSlice/cartSlice';
// import ProductProfile from './ProductProfile';
import { Link } from 'react-router-dom';


function ProductItem({ product }){
  // console.log(product.imageurl);
  const userid= useSelector((state)=>state.user.userid);
  const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
  const dispatch = useDispatch();

  if (typeof product !== 'object' || product === null) {
    console.error('Invalid product:', product);
    return <div>Invalid product data</div>;
  }

  const handleCartClick=async(instock)=>{
    if(instock>0){
      const payload={userId: userid, productid:product._id}  
      await dispatch(addToCartAsync(payload)); //addToCartAsync ley db maa add, loadToCartAsync ley db bata load
    }else{
      alert("Out of stock");
    }
    
  }
    return(   
      
      <div className="product-card">
      {isLoggedIn && 
        <i 
          className="bx bx-cart-add cart-icon" 
          onClick={() => handleCartClick(product.instock)} 
          role="button" 
          aria-label="Add to cart"
        ></i>
      }
      <Link to="/product/profile"> 
        <img
          src={`http://localhost:5000/public${product.imageurl}`}
          alt={product.details.name || "Product Image"}
          className="product-img"
        />
      
        <p className="product-name">{product.details.name}</p>
      </Link> 
      <div className="product-details">
        <ul className="product-info-list">
          <li className="product-brand">{product.details.brand}</li>
          {product.details.size && <li className="product-size">Size: {product.details.size}</li>}
          {product.details.watt && <li className="product-watt">Wattage: {product.details.watt}</li>}
          <li className="product-stock">
            {product.instock > 0 ? `In stock: ${product.instock} left` : 'Out of stock'}
          </li>
        </ul>
        <div className="product-price">Rs {product.details.price}</div>
      </div>
    </div>

    
    
    );
}
ProductItem.propTypes = {
  keyy: PropTypes.string,
  product: PropTypes.object.isRequired,
};
export default ProductItem;