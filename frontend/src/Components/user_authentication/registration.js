import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        email,
        phoneNo,
        password,
      });
      console.log(response.data); // Do something with the response
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <input
        type={showPassword ? 'text' : 'password'} // Dynamically change input type
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Button to toggle password visibility */}
      <button onClick={togglePasswordVisibility}>
        {showPassword ? 'Hide Password' : 'Show Password'}
      </button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Registration;
