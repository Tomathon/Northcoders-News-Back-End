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

const getArticlesByTopicId = (req, res) => {
  Topics.find({_id : req.params.topic_id})
    .then(topic => {
      return Articles.find({belongs_to : topic[0].slug})
    })
    .then(articles => {
      res.status(200).json({articles});
    })
    .catch(err => {
      res.status(500).json({"message": "Sorry, something went wrong"})
    });
}

module.exports = { getAllTopics, getArticlesByTopicId };