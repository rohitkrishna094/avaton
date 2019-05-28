const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const _ = require('lodash');
const getAuthenticatedUser = require('./shared/authenticate');

// Register
router.post('/register', async (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  try {
    const user = await User.getUserByUsername(newUser.username);
    if (user) {
      return res.status(409).json({ success: false, msg: `User already exists with username ${newUser.username}` });
    }
    await User.addUser(newUser);
    return res.json({ success: true, msg: 'User registered' });
  } catch (err) {
    return res.status(409).json({ success: false, msg: 'Some error occurred while registering the user' });
  }
});

// Authenticate
router.post('/login', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    const result = await User.comparePassword(password, user.password);
    if (result) {
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 604800 // 1 week
      });
      return res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      });
    }
    return res.json({ success: false, msg: 'Wrong password' });
  } catch (err) {
    return res.status(409).json({ success: false, msg: 'Some error occurred while logging in' });
  }
});

// test endpoint
router.get('/test', async (req, res, next) => {
  try {
    let user = await getAuthenticatedUser(req, res, next);
    return res.json({ success: true, user: _.omit(user, ['_id', 'password', '__v']) });
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'You are unauthorized' });
  }
});

module.exports = router;
