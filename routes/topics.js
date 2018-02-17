const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const topicsRouter = require('express').Router();
const { getAllTopics, getArticlesByTopicId } = require('../controllers/topics.controller');

topicsRouter.route('/')
  .get(getAllTopics);

topicsRouter.route('/:topic_id/articles')
  .get(getArticlesByTopicId);

module.exports = topicsRouter;