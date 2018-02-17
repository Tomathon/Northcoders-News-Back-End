const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articlesRouter = require('express').Router();
const { getAllArticles, getArticleComments, addArticleComment } = require('../controllers/articles.controller')

articlesRouter.route('/')
  .get(getAllArticles)

articlesRouter.route('/:article_id/comments')
  .get(getArticleComments)
  .post(addArticleComment)

module.exports = articlesRouter;