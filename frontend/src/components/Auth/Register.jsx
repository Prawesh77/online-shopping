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
        password: '',
        file:{}
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

const closeModal=(e)=>{
  if(registerRef.current === e.target){
    toggleForm();
  }
}
const handleFileChange = (e) => {
  setFormData((prevProduct) => ({
    ...prevProduct,
    file: e.target.files[0],
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData);
  //file bhako bhayera yesaro pathako natra sidai dispatch gardiye hunxa formdata halera
  const Creds = new FormData();
  Creds.append('userName', formData.userName);
  Creds.append('password', formData.password);
  Creds.append('email', formData.email);
  Creds.append('address', formData.address);
  Creds.append('image', formData.file);
  Creds.append('name[firstName]', formData.name.firstName);
  Creds.append('name[middleName]', formData.name.middleName);
  Creds.append('name[lastName]', formData.name.lastName)
  
  try {
    console.log(Creds);
    await dispatch(registerUser(Creds));
    toggleForm();
  } catch (error) {
    console.error('Registration error:', error);
  }
};

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
            onChange={handleChange}
          />
          <input
            type="text"
            className="form fname"
            placeholder="Middle Name"
            name="name.middleName"
            onChange={handleChange}
          />
          <input
            type="text"
            className="form fname"
            placeholder="Last Name*"
            required
            name="name.lastName"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            className="form username"
            placeholder="username"
            name="userName"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            className="form address"
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
          <br />
          
          <input
            type="email"
            className="form email"
            placeholder="E-mail*"
            required
            name="email"
            onChange={handleChange}
          />
          <br />
         
          <input
            type="password"
            className="form password"
            placeholder="Password*"
            required
            name="password"
            onChange={handleChange}
          />
          <label >Upload Profile Image</label>
          <input type='file' className='profile_img_upload' onChange={handleFileChange}></input>
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
