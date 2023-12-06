const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mrunali_chougule'; // Replace this with your actual secret key

exports.registerUser = (req, res) => {
  const { email, phoneNo, password } = req.body;

  if (!email || !phoneNo || !password) {
    return res.status(400).json({ message: 'Email, phoneNo, and password are required' });
  }

  // Check if the username or email already exists
  User.findOne({ $or: [{ email }, { phoneNo }] })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'PhoneNo or email already in use' });
      }

      // If not, create a new user
      const newUser = new User({ email, phoneNo, password });

      // Hash the password before saving it to the database
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, username: user.username };
            jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
              res.json({ success: true, token: 'Bearer ' + token });
            });
          } else {
            res.status(400).json({ message: 'Incorrect password' });
          }
        });
    });
};

exports.getUserByID = (req, res) => {
  const userID = req.params.id;

  User.findById(userID)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({ message: 'Server Error' }));
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'Server Error' }));
};

exports.updateUserByID = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required for changes' });
  }

  try {
    // Find the user by email (case-insensitive search)
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

     //if (!user || user.id.toString() !== req.params.userId) 
    if(!user)
    {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the request body email matches user's current email
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      return res.status(400).json({ message: 'Email cannot be changed' });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Update user's password with the hashed one
    user.password = hash;
    // Update the user with the new password
    await user.save();

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteUserByID = (req, res) => {
  const userID = req.params.id;

  User.findByIdAndDelete(userID)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Server Error' }));
};

