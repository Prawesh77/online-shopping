import "../css/Home.css"
import { useSelector } from "react-redux";


const Home = () => {
  const userName = useSelector((state) => state.user.userName);
    const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <div className="homee">
                <p className="txt1">Hello {userName?userName:""}</p>
                <p className="txt2">Welcome to my page</p>
                {isAdmin&& <p className="admin-badge">Admin</p>}               
    </div>
  )
}

export default Home