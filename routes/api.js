const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('express').Router();
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const commentsRouter = require('./comments');

apiRouter.route('/')
  .get((req, res, next) => {
    res.status(200).json({status: 'OK'})
  });

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter;