const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articlesRouter = require('express').Router();
const { getAllArticles, getArticleComments } = require('../controllers/articles.controller')

articlesRouter.route('/')
  .get(getAllArticles)

articlesRouter.route('/:article_id/comments')
  .get(getArticleComments)

module.exports = articlesRouter;