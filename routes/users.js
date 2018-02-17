const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('express').Router();
const getUser = require('../controllers/users.controller');

usersRouter.route('/:username')
  .get(getUser)

module.exports = usersRouter;