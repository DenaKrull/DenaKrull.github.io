const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(new Error('Username and password are required'));
  }
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return next(err);
    }
    try {
      const user = new User({ username: req.body.username, password: hash });
      const result = await user.save();
      console.log(result)
      return res.sendStatus(201);
    } catch (err) {
      if (err.code === 11000) {
        return next(new Error('Username already exists'));
      }
      return next(err);
    }
  });
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          req.session.user = req.body.username;
          return res.sendStatus(200);
        }
    }
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  } catch (err) {
    next(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.end();
});
module.exports = router;