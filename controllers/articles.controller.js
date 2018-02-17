const mongoose = require('mongoose');
const Articles = require('../models/articles');
const Comments = require('../models/comments')

const getAllArticles = (req, res, next) => {
  Articles.find()
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

const getArticleComments = (req, res, next) => {
  Comments.find({ belongs_to: req.params.article_id })
    .then(comments => {
      res.status(200).json({comments});
    })
    .catch(err => {
      return next({
        status: 404,
        message: "404, page not found"
      })
    });
}

module.exports = { getAllArticles, getArticleComments };
