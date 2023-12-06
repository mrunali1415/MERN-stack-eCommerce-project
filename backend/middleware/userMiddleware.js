const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mrunali_chougule'; // Replace this with your actual secret key

const validateEmailFormat = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};
//"Create a strong password! Minimum 8 characters, with 1 uppercase, 1 lowercase, and 1 number. Like 'MyP@ssw0rd'."
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

const validatePhoneNo = (phoneNo) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNo);
};

exports.validateRegistration = async (req, res, next) => {
  const { email, phoneNo, password } = req.body;

  if (!email || !phoneNo || !password) {
    return res.status(400).json({ message: 'Email, phoneNo, and password are required' });
  }

  if (!validateEmailFormat(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password requirements not met' });
  }

  if (!validatePhoneNo(phoneNo)) {
    return res.status(400).json({ message: 'Phone number must be 10 digits' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNo }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number or email already in use' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: 'Incorrect email or password' });
      }

      const payload = { id: user.id, username: user.username };
      jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Token creation failed' });
        }
        req.token = token; // Attach token to request object for later use
        next();
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
