import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Auth/Signup';
import ProductList from './Products/ProductList';
import Cart from './Cart/Cart';
import AdminProfile from './Profile/AdminProfile';
import "../css/App.css";
import Addproductform from './Products/AddProductForm';
import AdminRoute from './Protectedroutes/AdminRoute';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { fetchProducts } from "../redux/productSlice/productSlice";
import { loadCartAsync } from "../redux/CartSlice/cartSlice";

const App = () => {
  const userID = useSelector((state) => state.user.userid);

  const dispatch = useDispatch();
  // const {status} = useSelector(
  //   (state) => state.product.status
  // ); 
  useEffect(() => {
    // if (status === "idle") {
      console.log("status idle and dispatched");
      dispatch(fetchProducts());
    // }
  });
  const dispatched=(userID)=>{dispatch(loadCartAsync(userID)); }
  useEffect(()=>{
    if (userID){
      dispatched(userID);
    }
    // dispatched(userID);
    console.log("Hello");
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
              path="/profile"
              element={
                <AdminRoute>
                  <AdminProfile />
                </AdminRoute>
              }
            />
            <Route path="/cart" element={<Cart/>} />        
          </Routes>
      </Router>
    </>
  );
}

export default App