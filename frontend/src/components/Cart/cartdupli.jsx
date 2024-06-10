import { useEffect, useState,useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loadCartAsync } from "../../redux/CartSlice/cartSlice";
import "../../css/Cart.css";

const Cart = () => {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userid);
  const productLists = useSelector((state) => state.product.products);
console.log("Hello from cart.jsx")
  useEffect(()=>{
  dispatch(loadCartAsync(userID));
  console.log("Dispatched");
},[dispatch, userID])
      

  const cartProducts = useSelector((state) => state.cart.cart);


//   const combinedProducts = cartProducts.products?.map((cartProduct) => {
//     const matchingProduct = productLists.find(
//       (product) => product._id === cartProduct.productId
//     );
//     console.log("Hey combinedProducts");
//     return matchingProduct ? { ...cartProduct, ...matchingProduct } : null;
//   }).filter(Boolean);
  
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
    }
  }, [combinedProducts]);

  const handleIncrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
    console.log(quantities);
  };
  const handleDecrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0),
    }));
  };
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
                <button className="remove-button">
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
          <td colSpan="2">Total:</td>
          <td className="cart-total"></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};
export default Cart;
