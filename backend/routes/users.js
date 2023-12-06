const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middleware/userMiddleware');

// Registration route
router.post('/register', userMiddleware.validateRegistration, userController.registerUser);

// Login route
router.post('/login', userMiddleware.validateLogin, userController.loginUser);

// GET User by ID
router.get('/profile/:id', userController.getUserByID);

// GET All Users
router.get('/profile', userController.getAllUsers);

// Update User by ID
router.put('/profile/:id', userController.updateUserByID);

// DELETE User by ID
router.delete('/profile/:id', userController.deleteUserByID);

module.exports = router;
