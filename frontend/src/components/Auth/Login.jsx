import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice/userSlice";

import PropTypes from 'prop-types'

const Login = ({ toggleForm }) => {


      const dispatch= useDispatch();
      const [credentials, setCredentials]= useState({
        email:"",
        password:"",
      })

      const handleChange =(e)=>{
        // console.log(e);
          const{name, value}= e.target;
          setCredentials((prevCredentials)=>({
            ...prevCredentials,
            [name]: value,
          }));
      }


      const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(loginUser(credentials))
            const token = localStorage.getItem('token');
            {token &&(window.location.href = './')}
            } catch (error) {
                console.log("Error logging in");
            }
        };

  return (
    <div className="login-container">
      <form className="login" >
        <h2>Login</h2>
       
        <input
          type="email"
          id="email"
          name="email"
          className="form"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          id="password"
          name="password"
          className="form"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <br/>
          <button className="submit-button" onClick={handleLogin}>Login</button>
        
        <p className="form-msg">Please fill the form correctly<br/>If you have not signed up yet, <span className="popup-login" onClick={toggleForm}>click here</span></p>
      </form>
    </div>
  );
};

Login.propTypes = {
    toggleForm: PropTypes.func.isRequired
  };

export default Login;
