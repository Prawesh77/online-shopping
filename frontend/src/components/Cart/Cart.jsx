import { useEffect, useState,useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loadCartAsync, addToCartAsync } from "../../redux/CartSlice/cartSlice";
import "../../css/Cart.css";

const Cart = () => {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userid);
  const productLists = useSelector((state) => state.product.products);
  console.log("Hello from cart.jsx");
 

  const dispatched=(userID)=>{dispatch(loadCartAsync(userID)); }
  useEffect(()=>{
    dispatched(userID);
    console.log("Hello");
  },[userID])


  const cartProducts = useSelector((state) => state.cart.cart);
  const combinedProducts = useMemo(() => {
    return cartProducts.products?.map((cartProduct) => {
      const matchingProduct = productLists.find(
        (product) => product._id === cartProduct.productId
      );
      return matchingProduct ? { ...cartProduct, ...matchingProduct } : null;
    }).filter(Boolean);
  }, [cartProducts, productLists]);

  useEffect(() => {
    if (combinedProducts) {
      const initialQuantities = {};
      combinedProducts.forEach(product => {
        initialQuantities[product.productId] = 0;
      });
      setQuantities(initialQuantities);
      console.log(combinedProducts);
    }
  }, [combinedProducts]);


  const handleIncrement=async(pid)=>{
    const payload={userId: userID, productid:pid}  
    await dispatch(addToCartAsync(payload));
  }
  const handleDecrement=async(pid)=>{
    const payload={userId: userID, productid:pid, quantity: -1}  
    await dispatch(addToCartAsync(payload));
    
  }
  const handleRemove=async(pid)=>{
    const payload={userId: userID, productid:pid, quantity: 0}  
    await dispatch(addToCartAsync(payload));
  }

  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th className="product-id">Product Name</th>
          <th className="product">Brand</th>
          <th className="product">Price</th>
          <th className="quantity">Quantity</th>
          <th></th>
          <th>Total </th>
        </tr>
      </thead>
      <tbody>
        
        {cartProducts && cartProducts.products ?combinedProducts.map((product) => (
          <tr key={product.productId} className="cart-item">
            <td>{product.details.name}</td>
            <td>{product.details.brand}</td>
            <td>{product.details.price}</td>
            <td>{product.quantity}</td>
            <td>
                <button  className="quantity-button" onClick={() => handleIncrement(product.productId)}>+</button>
                <input value={quantities[product.productId]} className="quantity-input" />
                <button  className="quantity-button" onClick={() => handleDecrement(product.productId)}>-</button>
              </td>
              <td>{product.details.price * product.quantity}</td>
              <td>
                <button className="remove-button" onClick={() => handleRemove(product.productId)}>
                  Remove
                </button>
              </td>
          </tr>
        )):(
          <tr>no product</tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">Total:</td>
          <td className="cart-total"></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};
export default Cart;
