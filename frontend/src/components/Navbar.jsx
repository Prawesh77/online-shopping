import { Link } from "react-router-dom";
import "../css/Navbar.css"; 
import {logout} from "../redux/userSlice/userSlice"
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {
  const dispatch= useDispatch();
  const [isDarkMode, setIsDarkMode]=useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [cartnum, setCartNum]=useState(0)
  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.getBoundingClientRect().height;
      setNavbarHeight(height);
    }
  }, []);

  const cartProducts = useSelector((state) => state.cart.cart.products);
  const isLoggedIn= useSelector((state)=> state.user.isLoggedIn);
  const userName = useSelector((state)=> state.user.userName);
  const imageurl= useSelector((state)=> state.user.imageurl);
  // console.log(imageurl);
  const handleLogout=()=>{
    dispatch(logout());
    window.location.href = './login'
  };
  
  useEffect(()=>{
    setCartNum(cartProducts.length);
  })

 const toggleDarkMode=()=>{
  setIsDarkMode((prevMode)=> !prevMode);
  document.body.classList.toggle('dark_mode');

 }

 const handleImageClick = () => {
  setShowUserInfo(!showUserInfo);
};
// console.log(`http://localhost:5000/public${imageurl} `);
  return (
    // <div className="navbar" ref={navbarRef}>
    //     <img src="http://localhost:5000/public/thops.png" alt="thops" className="brand" />
    //       {!isLoggedIn ? (
    //         <div className="in_navbar">
    //         <div className="links">
    //           <Link to="/" className="link name">
    //             Home
    //           </Link>

    //           <Link to="/products" className="link name">
    //             Products
    //           </Link>
    //           <Link to="/login" className="link login_link">
    //             Login
    //           </Link>
    //         </div>
    //         <button onClick={toggleDarkMode}>
    //           {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    //         </button>
    //       </div>
    //       ) : (
    //         <div className="in_navbar">
    //         <div className="links">
    //           <Link to="/" className="link name">
    //             Home
    //           </Link>
    //           <Link to="/products" className="link name">
    //             Products
    //           </Link>
    //           </div>

    //           {/* <p className="your_name">{userName?userName:"no username"}</p>
    //               <button onClick={handleLogout} className="logout_link">
    //                 Logout
    //               </button> */}

    //             <img 
    //                     src={`http://localhost:5000/public${imageurl} `}
    //                     alt="thops" 
    //                     className="profilepic" 
    //                     onClick={handleImageClick} 
    //                   />

    //                   {showUserInfo && (
    //                     <div className={`user_info ${showUserInfo ? 'active' : ''}`} 
    //                     style={{ top: `${navbarHeight}px` }}>
    //                       <Link to="/profile"><p className="your_name">{userName ? userName : "no username"}</p></Link>
    //                       <button onClick={handleLogout} className="logout_link">
    //                         Logout
    //                       </button>
    //                     </div>
    //                   )}

                            
    //           <div className="for_cart">
    //               <Link to="/cart" >
    //                 <i className='bx bx-cart-add nav_cart'></i>
    //               </Link>    
    //               {
    //                 cartnum===0? 
    //                 <p className="cart_num_none"></p> :
    //                 <p className="cart_num">{cartnum}</p>
    //               } 
    //           </div>
    //           <button onClick={toggleDarkMode}>
    //           {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    //         </button>
    //       </div>
    //       ) }
    //   </div>
    <div className="navbar" ref={navbarRef}>
    <img src="http://localhost:5000/public/thops.png" alt="thops" className="brand" />
    {!isLoggedIn ? (
        <div className="in_navbar">
            <div className="links">
                <Link to="/" className="link name">
                    Home
                </Link>

                <Link to="/products" className="link product">
                    Products
                </Link>
                <Link to="/login" className="login_link">
                    Login
                </Link>
            </div>
            <button className="dark-mode-btn" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
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

            <div className="profile-section">
                <img
                    src={`http://localhost:5000/public${imageurl}`}
                    alt="Profile"
                    className="profile-pic"
                    onClick={handleImageClick}
                />
                <div className={`user-info ${showUserInfo ? 'active' : ''}`} style={{ top: `${navbarHeight}px` }}>
                    <Link to="/profile">
                        <p className="your-name">{userName ? userName : 'No Username'}</p>
                    </Link>
                    <button onClick={handleLogout} className="logout-link">
                        Logout
                    </button>
                </div>
            </div>

            <div className="for-cart">
                <Link to="/cart">
                    <i className="bx bx-cart-add nav-cart"></i>
                </Link>
                {cartnum === 0 ? <p className="cart-num-none"></p> : <p className="cart-num">{cartnum}</p>}
            </div>
            <button className="dark-mode-btn" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    )}
</div>

  )
}

export default Navbar