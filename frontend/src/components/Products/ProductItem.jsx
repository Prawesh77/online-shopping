//component to display a single product
import { useSelector, useDispatch } from 'react-redux';
import '../../css/Product.css';
import PropTypes from 'prop-types'
import { addToCartAsync } from '../../redux/CartSlice/cartSlice';


function ProductItem({ product }){
  const userid= useSelector((state)=>state.user.userid)
  const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
  const dispatch = useDispatch();


  const handleCartClick=async()=>{

    //database maa add garya
    console.log("To be dispatched")
    const payload={userId: userid, productid:product._id}  
    await dispatch(addToCartAsync(payload)); //addToCartAsync ley db maa add, loadToCartAsync ley db bata load
    console.log("dispatched")
  }
    return(
      <div className="maincomp" >
            
           {isLoggedIn && 
           <i className="bx bx-cart-add cart" onClick={handleCartClick}></i>
            }
            <img
              src="./images/electra.png"
              alt="electra 3 pin top"
              className="product_img"
            />
            <p className="product_name">{product.details.name}</p>
            <div className="seccomp">
              <div className="lists">
                <ul>
                  <li>{product.details.brand}</li>

                  {product.details.size && ( // yelai bhanxa Concise conditional rendering
                    <li>{product.details.size}</li>
                  )}

                  {product.details.watt && ( // Concise conditional rendering
                    <li>{product.details.watt}</li>
                  )}
                  {(product.instock>0) &&(
                    <li>instock: {product.instock} left</li>
                  )}
                </ul>
              </div>
              <div className="price">Rs {product.details.price}</div>
            </div>
          </div>  
      );
}
ProductItem.propTypes = {
  keyy: PropTypes.string,
  product: PropTypes.object.isRequired,
};
export default ProductItem;