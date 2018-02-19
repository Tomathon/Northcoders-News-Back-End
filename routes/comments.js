const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentsRouter = require('express').Router();
const { deleteComment, updateCommentVote } = require('../controllers/comments.controller');

commentsRouter.route('/:comment_id')
  .delete(deleteComment)
  .put(updateCommentVote)

module.exports = commentsRouter;