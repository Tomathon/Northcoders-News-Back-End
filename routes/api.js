const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('express').Router();

apiRouter.route('/')
  .get((req, res, next) => {
    res.status(200).json({status: 'OK'})
  })

module.exports = apiRouter;