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

module.exports = deleteComment;