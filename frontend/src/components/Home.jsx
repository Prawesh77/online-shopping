import "../css/Home.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const userName = useSelector((state) => state.user.userName);
    const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    // <div className="homee">
    //             <p className="txt1">Hello {userName?userName:""}</p>
    //             <p className="txt2">Welcome to my page</p>
    //             {isAdmin&& <p className="admin-badge">Admin</p>}               
    // </div>
    <div className="home">
    
        <div className="hero">
            <img src="public/images/homepage.png" alt="Hero Image" className="hero-image" />
            <div className="hero-text">
            <div className="welcome-section">
                <p className="txt1">Hello, {userName ? userName : "Guest"}</p>
                {isAdmin && <p className="admin-badge">Admin</p>}
            </div>
                <h1>Welcome to Our Store</h1>
                <p>Discover amazing products at unbeatable prices.</p>
                <Link to="/products"><button className="shop-now-btn">Shop Now</button></Link>
                
            </div>
        </div>

    </div>



  )
}

export default Home