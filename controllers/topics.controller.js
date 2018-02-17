const mongoose = require('mongoose');
const Topics = require('../models/topics');
const Articles = require('../models/articles');

const getAllTopics = (req, res, next) => {
  Topics.find()
    .then((topics) => {
      res.status(200).json({topics});
    })
    .catch(err => {
      return next({
        status: 404,
        message: "404, page not found"
      })
    });
}

const getArticlesByTopicId = (req, res, next) => {
  Topics.find({_id : req.params.topic_id})
    .then(topic => {
      return Articles.find({belongs_to : topic[0].slug})
    })
    .then(articles => {
      res.status(200).json({articles});
    })
    .catch(err => {
      return next({
        status: 404,
        message: "404, page not found"
      })
    });
}

module.exports = { getAllTopics, getArticlesByTopicId };