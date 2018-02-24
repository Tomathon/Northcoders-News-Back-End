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
  const id = req.params.topic_id
  if (!id.match(/^[0-9a-f]{24}$/)) res.status(400).json({"message": `Topic ID:${id} does not exist, please enter a valid Topic ID`})
  else {
  Topics.find({_id : id})
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
}

module.exports = { getAllTopics, getArticlesByTopicId };