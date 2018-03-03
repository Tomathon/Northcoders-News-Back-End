const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articlesRouter = require('express').Router();
const { getOneArticle, getAllArticles, getArticleComments, addArticleComment, updateArticleVote } = require('../controllers/articles.controller')

articlesRouter.route('/')
  .get(getAllArticles)

articlesRouter.route('/:article_id/comments')
  .get(getArticleComments)
  .post(addArticleComment)

articlesRouter.route('/:article_id')
  .get(getOneArticle)
  .put(updateArticleVote)

module.exports = articlesRouter;