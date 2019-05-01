const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', async (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.getUserByUsername(newUser.username)
    .then(user => {
      if (user) {
        return res.status(409).json({ success: false, msg: 'User already exists with username ' + newUser.username });
      }
      User.addUser(newUser, (err, user) => {
        if (err) {
          return res.json({
            success: false,
            msg: 'Failed to register user'
          });
        } else {
          return res.json({
            success: true,
            msg: 'User registered'
          });
        }
      });
    })
    .catch(err => {
      return res.status(409).json({
        success: false,
        msg: 'Some error occurred while registering the user'
      });
    });
});

// Authenticate
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    }); // end comparePassword
  }); // end getUserByUsername
});

// Profile
router.get(
  '/profile',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res, next) => {
    res.json({
      user: req.user
    });
  }
);

module.exports = router;
