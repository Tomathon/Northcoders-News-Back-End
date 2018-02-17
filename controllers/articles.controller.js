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

const addArticleComment = (req, res, next) => {
  if (req.body.comment.length === 0) next({ message: 'Bad request, please ensure you include a comment in your request', status: 400})

  const comment = new Comments({
    body: req.body.comment,
    belongs_to: req.params.article_id
  })

  Articles.findById(req.params.article_id)
    .then(article => {
      return comment.save();
    })
    .then(comment => {
      res.status(201).send("Comment successfully added");
    })
    .catch(next)
}

module.exports = { getAllArticles, getArticleComments, addArticleComment };