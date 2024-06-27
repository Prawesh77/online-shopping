// import { useEffect, useState} from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { loadCartAsync, addToCartAsync } from "../../redux/CartSlice/cartSlice";
// import "../../css/Cart.css";
// import Order from "../order/Order";

// const Cart = () => {

//   const dispatch = useDispatch();
//   const [showOrder, setShowOrder]=useState(false);
//   const userID = useSelector((state) => state.user.userid);
 

//   const dispatched=(userID)=>{dispatch(loadCartAsync(userID)); }
//   useEffect(()=>{
//     dispatched(userID);
//   },[userID])


//   const cartProducts = useSelector((state) => state.cart.cart.products);
//   console.log(cartProducts);
//   console.log(typeof (cartProducts));


// // Calculate total price
// const totalPrice = cartProducts.reduce((acc, product) => {
//   return acc + product.details.details.price * product.quantity;
// }, 0);

//   const handleIncrement=async(pid, instock, quantity)=>{
//     const payload={userId: userID, productid:pid}  
//     if(quantity<instock){
//       await dispatch(addToCartAsync(payload));
//     }
//     console.log(cartProducts);
//   }
//   const handleDecrement=async(pid)=>{
//     const payload={userId: userID, productid:pid, quantity: -1}  
//     await dispatch(addToCartAsync(payload));
    
//   }
//   const handleRemove=async(pid)=>{
//     const payload={userId: userID, productid:pid, quantity: 0}  
//     await dispatch(addToCartAsync(payload));
//   }
// const handleRemoveAll=async()=>{

// }
// const handleOrder=async()=>{
//       setShowOrder((prevShowOrder)=> !prevShowOrder);
// }
// const handleOrderAll=async()=>{

// }
// const toggleOrder=()=>{
//   setShowOrder((prevShowOrder)=> !prevShowOrder);
// }

//   return (
//     <div>

//         <table className="cart-table">
//           <thead>
//             <tr>
//               <th className="product">Visual</th>
//               <th className="product-id">Product Name</th>
//               <th className="product">Brand</th>
//               <th className="product">Price</th>
//               <th className="quantity">Quantity</th>
//               <th></th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartProducts && cartProducts.length > 0 ? cartProducts.map((product) => (
//               <tr key={product.productId} className="cart-item">
//                 <td>
//                   <img
//                     src={`http://localhost:5000/public${product.details.imageurl}`}
//                     alt={product.details.details.name}
//                     className="product-image"
//                   />
//                 </td>
//                 <td>{product.details.details.name}</td>
//                 <td>{product.details.details.brand}</td>
//                 <td>{product.details.details.price.toFixed(2)}</td>
//                 <td>{product.quantity}</td>
//                 <td>
//                   <button
//                     className="quantity-button"
//                     onClick={() => handleIncrement(product.productId,product.details.instock,product.quantity)}
//                   >
//                     +
//                   </button>
//                   <input
//                     type="Number"
//                     min="1" max={product.details.instock}
//                     value={product.quantity}
//                     className="quantity-input"
//                   />
//                   <button
//                     className="quantity-button"
//                     onClick={() => handleDecrement(product.productId)}
//                   >
//                     -
//                   </button>
//                 </td>
//                 <td>{(product.details.details.price * product.quantity).toFixed(2)}</td>
//                 <td>
//                   <button
//                     className="remove-button"
//                     onClick={() => handleRemove(product.productId)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//                 <td>
//                 <button
//                     className="order-button"
//                     onClick={() => handleOrder(product.productId)}
//                   >
//                     Buy
                    
//                   </button>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="7">No products in the cart</td>
//               </tr>
//             )}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="6">Total:</td>
//               <td className="cart-total">{totalPrice.toFixed(2)}</td>
//               <td>
//                   <button
//                     className="remove-button"
//                     onClick={() => handleRemoveAll()}
//                   >
//                     Remove All
//                   </button>
//                 </td>
//               <td>
//                 <button
//                     className="order-button"
//                     onClick={() => handleOrderAll()}
//                   >
//                     Buy All
//                   </button>
//                 </td>
//             </tr>
//           </tfoot>
//         </table>
//         {showOrder && <Order toggleOrder={toggleOrder}/>}
//     </div>
//   );
// };
// export default Cart;


import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCartAsync, addToCartAsync } from "../../redux/CartSlice/cartSlice";
import "../../css/Cart.css";
import Order from "../order/Order";

const Cart = () => {
  const dispatch = useDispatch();
  const [showOrder, setShowOrder] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const userID = useSelector((state) => state.user.userid);

  const dispatched = (userID) => {
    dispatch(loadCartAsync(userID));
  };

  useEffect(() => {
    if (userID) {
      dispatched(userID);
    }
  }, [userID]);

  const cartProducts = useSelector((state) => state.cart.cart.products);

  // Calculate total price
  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.details.details.price * product.quantity;
  }, 0);

  const handleIncrement = async (pid, instock, quantity) => {
    const payload = { userId: userID, productid: pid };
    if (quantity < instock) {
      await dispatch(addToCartAsync(payload));
    }
  };

  const handleDecrement = async (pid) => {
    const payload = { userId: userID, productid: pid, quantity: -1 };
    await dispatch(addToCartAsync(payload));
  };

  const handleRemove = async (pid) => {
    const payload = { userId: userID, productid: pid, quantity: 0 };
    await dispatch(addToCartAsync(payload));
  };

  const handleRemoveAll = async () => {
    // Logic to remove all products from the cart
  };

  const handleOrder = async (productId) => {
    setSelectedProductId(productId);
    console.log(selectedProductId);
    setShowOrder(true);
  };

  const handleOrderAll = async () => {
    // Logic to order all products
  };

  const toggleOrder = () => {
    setShowOrder((prevShowOrder) => !prevShowOrder);
  };

  return (
    <div className="cartlist">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th className="product">Visual</th>
            <th className="product-id">Product Name</th>
            <th className="product">Brand</th>
            <th className="product">Price</th>
            <th className="quantity">Quantity</th>
            <th></th>
            <th>Total</th>
            <th>Remove</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <tr key={product.productId} className="cart-item">
                <td>
                  <img
                    src={`http://localhost:5000/public${product.details.imageurl}`}
                    alt={product.details.details.name}
                    className="product-image"
                  />
                </td>
                <td>{product.details.details.name}</td>
                <td>{product.details.details.brand}</td>
                <td>{product.details.details.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncrement(product.productId, product.details.instock, product.quantity)}
                  >
                    +
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.details.instock}
                    value={product.quantity}
                    className="quantity-input"
                    readOnly
                  />
                  <button
                    className="quantity-button"
                    onClick={() => handleDecrement(product.productId)}
                  >
                    -
                  </button>
                </td>
                <td>{(product.details.details.price * product.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(product.productId)}
                  >
                    Remove
                  </button>
                </td>
                <td>
                  <button
                    className="order-button"
                    onClick={() => handleOrder(product.productId)}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products in the cart</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">Total:</td>
            <td className="cart-total">{totalPrice.toFixed(2)}</td>
            <td>
              <button className="remove-button" onClick={handleRemoveAll}>
                Remove All
              </button>
            </td>
            <td>
              <button className="order-button" onClick={handleOrderAll}>
                Buy All
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      {showOrder && <Order productId={selectedProductId} toggleOrder={toggleOrder} />}
    </div>
  );
};

export default Cart;
