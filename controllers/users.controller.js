const mongoose = require('mongoose');
const Users = require('../models/users');

const getUser = (req, res) => {
  Users.findOne({ username: req.params.username })
    .then(user => {
      if (user === null) res.status(400).json({"message": "Username does not exist, please ensure the username is valid"})
      else res.status(200).json({user})
    })
    .catch(err => {
      res.status(500).json({"message": "Sorry, something went wrong"})
    });
}

module.exports = getUser;