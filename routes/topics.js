const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const topicsRouter = require('express').Router();
const getAllTopics = require('../controllers/topics.controller');

topicsRouter.route('/')
  .get(getAllTopics);
  
module.exports = topicsRouter;