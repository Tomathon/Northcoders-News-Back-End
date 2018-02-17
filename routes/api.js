const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('express').Router();
const topicsRouter = require('./topics');

apiRouter.route('/')
  .get((req, res, next) => {
    res.status(200).json({status: 'OK'})
  });

apiRouter.use('/topics', topicsRouter)

module.exports = apiRouter;