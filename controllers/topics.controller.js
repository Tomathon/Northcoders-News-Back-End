const mongoose = require('mongoose');
const Topics = require('../models/topics');
const Articles = require('../models/articles');

const getAllTopics = (req, res) => {
  Topics.find()
    .then((topics) => {
      res.status(200).json({topics});
    })
    .catch(err => {
      res.status(500).json({"message": "Sorry, something went wrong"})
    });
}

const getArticlesByTopic = (req, res) => {
  return Articles.find({'belongs_to': req.params.topic})
    .then(articles => {
      return res.status(200).json({articles});
    })
    .catch(err => {
      res.status(500).json({"message": "Sorry, something went wrong"})
    });
  }

module.exports = { getAllTopics, getArticlesByTopic };