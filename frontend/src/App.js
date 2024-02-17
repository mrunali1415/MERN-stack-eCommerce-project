//import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/nav/navbar.js';
import User from './Components/nav/user.js';
import Home from './Components/nav/home';
import Services from './Components/nav/services';
import Contact from './Components/nav/contact';

function App() {
  return (
    <Router>
    <div className="App">
    <header className='App-header'>
          <h1> E-Commerce Website</h1>
          <Navbar/>
        </header>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user/login" element={<User/>} />
            <Route path="/user/register" element={<User/>} />
          </Routes>
          
      </div>
      </Router>
  );
}

export default App;
