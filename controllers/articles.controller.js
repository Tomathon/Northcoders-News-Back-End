const mongoose = require('mongoose');
const Articles = require('../models/articles');
const Comments = require('../models/comments')

const getAllArticles = (req, res) => {
  Articles.find()
    .then(articles => {
      res.status(200).json({articles});
    })
    .catch(err => {
      res.status(500).json({"message": "Sorry, something went wrong"})
    });
}

const getArticleComments = (req, res) => {
  const id = req.params.article_id
  if (!id.match(/^[0-9a-f]{24}$/)) res.status(400).json({"message": `Id ${id} is invalid. Please provide a valid Article Id containing only numbers and lowercase letters`})
  
  Comments.find({ belongs_to: id })
    .then(comments => {
      res.status(200).json({comments});
    })
    .catch(err => {
        res.status(500).json({"message": "Sorry, something went wrong"})
    });
}

const addArticleComment = (req, res) => {
  const id = req.params.article_id;
  if (req.body.comment.length === 0) res.status(400).json({ "message": "Bad request, please ensure you include a comment in your request"})
  else if (!id.match(/^[0-9a-f]{24}$/)) res.status(400).json({"message": `Id ${id} is invalid. Please provide a valid Article Id containing only numbers and lowercase letters`})
  else {
    const comment = new Comments({
      body: req.body.comment,
      belongs_to: id
    })

    Articles.findById(id)
      .then(article => {
        return comment.save()
      })
      .then(comment => {
        res.status(201).send("Comment successfully added")
      })
      .catch(err => {
        res.status(500).json({"message": "Sorry, something went wrong"})
      })
  }
}

const updateArticleVote = (req, res) => {
  const id = req.params.article_id;
  const query = req.query.vote

  if (!id.match(/^[0-9a-f]{24}$/)) res.status(400).json({"message": `Id ${id} is invalid. Please provide a valid Article Id containing only numbers and lowercase letters`})
  else if (query !== 'up' && query !== 'down') res.status(400).json({"message": "Please provide a query in the format vote=up or vote=down"})
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
      .catch(err => {
        res.status(500).json({"message": "Sorry, something went wrong"})
      })
  }
}

module.exports = { getAllArticles, getArticleComments, addArticleComment, updateArticleVote };