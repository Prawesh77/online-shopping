import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Auth/Signup';
import ProductList from './Products/ProductList';
import Cart from './Cart/Cart';
import Profile from './Profile/Profile';
import "../css/App.css";
import Addproductform from './Products/AddProductForm';
import AdminRoute from './Protectedroutes/AdminRoute';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { fetchProducts } from "../redux/productSlice/productSlice";
import { loadCartAsync } from "../redux/CartSlice/cartSlice";
import OrderSummaryProfile from './Profile/OrderSummaryProfile';
import OrderStatus from './Profile/OrderStatus';
import BargainAdmin from './Profile/BargainAdmin';
import BargainUser from './Profile/BargainUser';

const App = () => {
  const userID = useSelector((state) => state.user.userid);

  const dispatch = useDispatch();
  // const {status} = useSelector(
  //   (state) => state.product.status
  // ); 
  useEffect(() => {
    // if (status === "idle") {
      // console.log("status idle and dispatched");
      dispatch(fetchProducts());
    // }
  });
  const dispatched=(userID)=>{dispatch(loadCartAsync(userID)); }
  useEffect(()=>{
    if (userID){
      dispatched(userID);
    }
    // dispatched(userID);
    // console.log("Hello");
  },[userID])


  return (
    <>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home name={name} />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/addnewproduct"
              element={
                <AdminRoute>
                  <Addproductform />
                </AdminRoute>
              }
            />
            <Route
              path="/profile/summary"
              element={
                <AdminRoute>
                  <OrderSummaryProfile />
                </AdminRoute>
              }
            />
            <Route
              path="/profile/bargainadmin"
              element={
                <AdminRoute>
                  <BargainAdmin/>
                </AdminRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<OrderStatus />} />
            <Route path="/cart" element={<Cart/>} />

            <Route path="/profile/bargainuser" element={<BargainUser/>} />        
          </Routes>
      </Router>
    </>
  );
}

export default App