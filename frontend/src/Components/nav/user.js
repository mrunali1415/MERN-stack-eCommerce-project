
import React, { useState, } from 'react';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// import { useHistory } from 'react-router-dom'; // Import useHistory from React Router
import './user.css';

const User = () => {
  // const history = useHistory(); // Initialize useHistory
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(
    //     {
    //   password: "",
    //   showPassword:false,
    // }
  );
  const [phoneNo, setPhoneNo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(true); // Added state for form visibility
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const handleAuthentication = async (event) => {
    setPassword(event.target.value)
    event.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await axios.post('http://localhost:3000/users/login', {
          email,
          password,
        });
      } else {
        response = await axios.post('http://localhost:3000/users/register', {
          email,
          phoneNo,
          password,
        });
        setRegistrationSuccess(true); // Set registration success state to true
      }
      console.log(response.data); // Do something with the response
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthenticationMode = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setIsLogin(!isLogin);
    setShowForm(true); // Open the form whenever authentication mode is toggled
  };
  const handleCloseForm = () => {
    setShowForm(false);
    // history.push('http://localhost:3000/'); // Redirect to home page when form is closed
  };

  return (
    <>
      {showForm && (
        <div className="form_container_wrapper">
          <div className="form_container">
            <span className="form_close" onClick={handleCloseForm}>X</span>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {registrationSuccess ? (
              <p>Registration successful. Thank you for registering!</p> // Display success message
            ) : (
              <form onSubmit={handleAuthentication}>
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="uil uil-envelope-alt email"></i>
                </div>
                {!isLogin && (
                  <div className="input_box">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    <i className="uil uil-phone-alt phone"></i>
                  </div>
                )}
                <div className="input_box">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <EyeOutlined className="eye_icon" onClick={togglePasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined className="eye_icon" onClick={togglePasswordVisibility} />
                  )}
                </div>
                <button className="button" type="submit">{isLogin ? 'Login' : 'Register'} Now</button>
              </form>
            )}
            <div className="login_register">
              {/* {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="login_register" onClick={toggleAuthenticationMode}>
  {isLogin ? "Don't have an account? " : "Already have an account? "}
  {isLogin ? 'Register' : 'Login'}
</button> */}
              {!registrationSuccess && ( // Conditionally render registration button
                <>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button className="login_register" onClick={toggleAuthenticationMode}>
                    {isLogin ? 'Register' : 'Login'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
