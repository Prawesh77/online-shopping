import { Link } from "react-router-dom";
import "../css/Navbar.css"; 
import {logout} from "../redux/userSlice/userSlice"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {
  const dispatch= useDispatch();
  const isLoggedIn= useSelector((state)=> state.user.isLoggedIn);
  const userName = useSelector((state)=> state.user.userName);

  const handleLogout=()=>{
    dispatch(logout());
    window.location.href = './login'
  };

  const [cartnum, setCartNum]=useState(1)
  const cartProducts = useSelector((state) => state.cart.cart);
  
  useEffect(()=>{
    setCartNum(cartProducts.products.length);
  })



  return (
    <div className="navbar">
        <img src="./images/thops.png" alt="thops" className="brand" />
          {!isLoggedIn ? (
            <div className="in_navbar">
            <div className="links">
              <Link to="/" className="link name">
                Home
              </Link>

              <Link to="/products" className="link name">
                Products
              </Link>
              <Link to="/login" className="link login_link">
                Login
              </Link>
            </div>
          </div>
          ) : (
            <div className="in_navbar">
            <div className="links">
              <Link to="/" className="link name">
                Home
              </Link>
              <Link to="/products" className="link name">
                Products
              </Link>
              </div>
              <p className="your_name">{userName?userName:"no username"}</p>
              <button onClick={handleLogout} className="logout_link">
                Logout
              </button>
              <div className="for_cart">
              <Link to="/cart" >
                <i className='bx bx-cart-add nav_cart'></i>
              </Link>     
              <p className="cart_num">{cartnum}</p>
              </div>
          </div>
          ) }
      </div>
  )
}

export default Navbar