const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const _ = require('lodash');
const getAuthenticatedUser = require('./shared/authenticate');

// error handler for unauthorized or not
router.use(async (req, res, next) => {
  try {
    let user = await getAuthenticatedUser(req, res, next);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'You are unauthorized' });
  }
});

// get high level information
// needed when user opens the profile page
// this is where we will return timeline info as well
router.get('/', async (req, res, next) => {
  return res.json({ user: req.user });
});

router.put('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const body = req.body;
  const user = req.user;
  const data = await User.updateUserData(user._id, body);
  return res.json({ user: _.omit(JSON.parse(JSON.stringify(data)), ['_id', 'password', '__v']) });
});

module.exports = router;
