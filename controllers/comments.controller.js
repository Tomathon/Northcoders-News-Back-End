const mongoose = require('mongoose');
const Comments = require('../models/comments')
const Articles = require('../models/articles')

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
    let count = 0;
    if (query === 'up') count++;
    if (query === 'down') count--;
    return Comments.findByIdAndUpdate({_id: req.params.comment_id}, { $inc: {"votes": count}})
      .then(results => {
        results.votes += count;
        res.status(200).json({results});
      })
      .catch(err => {
        res.status(500).json({"message":"Sorry, something went wrong"})
      });
  }
}

module.exports = { deleteComment, updateCommentVote };