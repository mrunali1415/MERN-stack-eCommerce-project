import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle clicking on the login button
  const handleLoginClick = () => {
    navigate('/user/login'); // Navigate to the login page
  };

  return (
    <nav className="nav">
      <ul className="nav_items">
        <li className="nav_item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav_item">
          <Link to="/services">Services</Link>
        </li>
        <li className="nav_item">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <button className="button-o" onClick={handleLoginClick} id="form-open">Login</button>
    </nav>
  );
};

export default Navbar;
