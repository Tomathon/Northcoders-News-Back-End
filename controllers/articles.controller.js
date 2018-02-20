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

const updateArticleVote = (req, res, next) => {
  const id = req.params.article_id;
  const query = req.query.vote
  console.log(id, query)
  if (!id.match(/^[0-9a-f]{24}$/)) next({message: `Comment ${id} does not exist, please enter a valid comment id`, status: 400})
  else if (query !== 'up' && query !== 'down') next({message: "Please provide a query in the format vote=up or vote=down", status: 400})
  else {
    Articles.findByIdAndUpdate(id)
    .then(comment => {
      let votes = comment.votes
      if (query === 'up') votes += 1
      if (query === 'down') votes -= 1
      return Articles.update({_id: id}, {votes: votes})
      })
      .then(updatedComment => {
        res.status(201).send(`Thanks for your vote on Comment ${id}`)
      })
      .catch(next)
  }
}


module.exports = { getAllArticles, getArticleComments, addArticleComment, updateArticleVote };