const mongoose = require('mongoose');
const Comments = require('../models/comments')

const deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  if (!id.match(/^[0-9a-f]{24}$/)) next({message: `Comment ${id} does not exist, please enter a valid comment id`, status: 400})
  else {
    Comments.findByIdAndRemove(id)
      .then(comment => {
        res.status(202).send(`Comment ${id} has been successfully deleted`)
      })
      .catch(next);
  }
}

const updateCommentVote = (req, res, next) => {
  const id = req.params.comment_id;
  const query = req.query.vote
  if (!id.match(/^[0-9a-f]{24}$/)) next({message: `Comment ${id} does not exist, please enter a valid comment id`, status: 400})
  else if (query !== 'up' && query !== 'down') next({message: "Please provide a query in the format vote=up or vote=down", status: 400})
  else {
    Comments.findByIdAndUpdate(id)
    .then(comment => {
      let votes = comment.votes
      if (query === 'up') votes += 1
      if (query === 'down') votes -= 1
      return Comments.update({_id: id}, {votes: votes})
      })
      .then(updatedComment => {
        res.status(201).send(`Thanks for your vote on Comment ${id}`)
      })
      .catch(next)
  }
}

module.exports = { deleteComment, updateCommentVote };