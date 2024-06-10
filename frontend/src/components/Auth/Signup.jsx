import { useState } from 'react';
import Login from './Login';
import Register from "./Register";
import "../../css/Login.css";

const Signup = () => {
    const [showRegForm, setShowRegForm] = useState(false);

    const toggleForm = () => {
      setShowRegForm(!showRegForm);
    };
    return (
    <div>
            {/* <div  className="login_page"> */}
                {/* <div className="name_login">
                    <img src="./images/thops.png" alt="merai_photo_ho" className="thopda"/>
                </div> */}
                <Login toggleForm={toggleForm}/>
              {showRegForm && <Register toggleForm={toggleForm}/>}
            {/* </div> */}
            
          </div>
  )
}

export default Signup