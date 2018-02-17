const mongoose = require('mongoose');
const Topics = require('../models/topics');

getAllTopics = (req, res, next) => {
  Topics.find()
    .then((topics) => {
      res.send(topics);
    })
    .catch(console.error);
}

module.exports = getAllTopics;