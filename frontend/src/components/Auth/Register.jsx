import {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { registerUser } from '../../redux/userSlice/userSlice';

function Register({ toggleForm }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: {
                firstName: '',
                middleName: '',
                lastName: ''
              },
        userName:'',
        address: '',
        email: '',
        password: ''
    });
    const registerRef= useRef();

    const handleChange = (e) => {
      const { name, value } = e.target;
          if (name.startsWith("name.")) {
            const detailName = name.split(".")[1];
            setFormData((prevformData) => ({
              ...prevformData,
              name: {
                ...prevformData.name,
                [detailName]: value,
              },
            }));
          } else {
            setFormData((prevformData) => ({
              ...prevformData,
              [name]: value,
            }));
          }
      };
      const handleSubmit = async (e) => {
          e.preventDefault();
          console.log(formData);
          
          try {
            await dispatch(registerUser(formData));
            alert("User Registered");
            toggleForm();
          } catch (error) {
            console.error('Registration error:', error);
          }
        };


const closeModal=(e)=>{
  if(registerRef.current === e.target){
    toggleForm();
  }
}


    return (
      <div className="registerpopup" ref={registerRef} onClick={closeModal}>
        
        <form className="login" onSubmit={handleSubmit} >
          <p className='midtxt'>Sign UP</p>
          <input
            type="text"
            className="form fname"
            placeholder="First Name*"
            required
            name="name.firstName"
            value={formData.name.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form fname"
            placeholder="Middle Name"
            name="name.middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form fname"
            placeholder="Last Name*"
            required
            name="name.lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            className="form username"
            placeholder="username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            className="form address"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <br />
          
          <input
            type="email"
            className="form email"
            placeholder="E-mail*"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
         
          <input
            type="password"
            className="form password"
            placeholder="Password*"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <input type="submit" className="submit-button"></input>
          <p className="form_msg">
            Please fill the form correctly
            <br />
            If you already have an account{" "}
            <span className="popup_login" onClick={toggleForm}>
              click here
            </span>
          </p>
        </form>
      </div>
    );
}

Register.propTypes = {
    toggleForm: PropTypes.func.isRequired
};

export default Register
