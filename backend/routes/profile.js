const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const _ = require('lodash');

// get high level information
// needed when user opens the profile page
// this is where we will return timeline info as well
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) =>
  res.json({ user: req.user })
);

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  return res.json({ user: req.user });
});

module.exports = router;
