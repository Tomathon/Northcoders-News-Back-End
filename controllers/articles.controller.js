const mongoose = require('mongoose');
const Articles = require('../models/articles');

const getAllArticles = (req, res, next) => {
  Articles.find()
    .then(articles => {
      res.status(200).json({articles});
    })
    .catch(err => {
      return next({
        status: 404,
        message: "404, page not found"
      })
    });
}

module.exports = getAllArticles;
