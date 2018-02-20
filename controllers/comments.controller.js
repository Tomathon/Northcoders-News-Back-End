const mongoose = require('mongoose');
const Comments = require('../models/comments')

const deleteComment = (req, res) => {
  const id = req.params.comment_id;
  if (!id.match(/^[0-9a-f]{24}$/)) res.status(400).json({"message": `Comment ${id} does not exist, please enter a valid comment id`})
  else {
    Comments.findByIdAndRemove(id)
      .then(comment => {
        res.status(202).json({"message": `Comment ${id} has been successfully deleted`})
      })
      .catch(err => {
        res.status(500).json({"message": "Sorry, something went wrong"})
      });
  }
}

const updateCommentVote = (req, res) => {
  const id = req.params.comment_id;
  const query = req.query.vote
  if (!id.match(/^[0-9a-f]{24}$/)) res.status(400).json({"message": `Comment ${id} does not exist, please enter a valid comment id`})
  else if (query !== 'up' && query !== 'down') res.status(400).json({"message": "Please provide a query in the format vote=up or vote=down"})
  else {
    Comments.findByIdAndUpdate(id)
      .then(comment => {
        let votes = comment.votes
        if (query === 'up') votes += 1
        if (query === 'down') votes -= 1
        return Comments.update({_id: id}, {votes: votes})
        })
      .then(updatedComment => {
        res.status(201).json({"message":`Thanks for your vote on Comment ${id}`})
      })
      .catch(err => {
        res.status(500).json({"message": "Sorry, something went wrong"})
      });
  }
}

module.exports = { deleteComment, updateCommentVote };