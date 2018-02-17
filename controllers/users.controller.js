const mongoose = require('mongoose');
const Users = require('../models/users');

const getUser = (req, res, next) => {
  Users.findOne({ username: req.params.username })
    .then(user => {
      if (user === null) next({ message: 'Username does not exist, please ensure the username is valid', status: 400})
      else res.status(200).json({user})
    })
    .catch(next);
}

module.exports = getUser;