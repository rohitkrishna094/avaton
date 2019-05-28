const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const avatarUrl = '';
const coverUrl = '';

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: { type: [String], default: ['user'] },
  birthDate: { type: Date, default: new Date().toLocaleDateString() },
  joinedAt: { type: Date, default: new Date() },
  about: { type: String, default: '' },
  gender: { type: String, default: 'None' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatarUrl: { type: String, default: avatarUrl },
  coverUrl: { type: String, default: coverUrl }
});

const User = (module.exports = mongoose.model('User', UserSchema));

module.exports.getUserById = (id, callback) => User.findById(id, callback);

module.exports.getUserByUsername = username => User.findOne({ username }).exec();

module.exports.addUser = newUser => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      return newUser.save();
    });
  });
};

module.exports.comparePassword = (candidatePassword, hash) => bcrypt.compare(candidatePassword, hash);
