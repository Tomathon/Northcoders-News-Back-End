process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const seed = require('../seed/test.seed');
const mongoose = require('mongoose');
const server = require('../server');
const request = require('supertest')(server);
const bodyParser = require('body-parser');

describe('API endpoints', () => {
    
  let docs = {};

  beforeEach(() => {
    return mongoose.connection.dropDatabase()
      .then(() => {
          return seed()
      })
      .then(data => {
          docs = data;
      })
  });

  after(() => {
    return mongoose.disconnect();
  })

  describe('/articles API endpoints', () => {
    it('getAllArticles returns all of the articles contained in the database', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles.length).to.equal(2);
          return;
        });
    });
    it('getArticleComments returns all of the comments for a given article ID', () => {
      const articleId = docs.articles[0]._id
      return request
        .get(`/api/articles/${articleId}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments.length).to.equal(2);
        });
    });
    it('addArticleComment posts a new comment for a given article ID', () => {
      const articleId = docs.articles[0]._id
      return request
        .post(`/api/articles/${articleId}/comments`)
        .send({"comment": "This is a comment for testing"})
        .expect(201)
        .then(res => {
          expect(res.text).to.equal('Comment successfully added')
        })
    })
    it('addArticleComment responds with a 400 HTTP response if an invalid article ID is sent in the request', () => {
      return request
        .post(`/api/articles/FFF67207/comments`)
        .send({"comment": "This is a comment for testing"})
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({ "message": "Id FFF67207 is invalid. Please provide a valid Article Id containing only numbers and lowercase letters" })
        })
    })
    it('addArticleComment responds with a 400 HTTP response if the request body is empty', () => {
      const articleId = docs.articles[0]._id
      return request
        .post(`/api/articles/${articleId}/comments`)
        .send({"comment": ""})
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({ "message": "Bad request, please ensure you include a comment in your request" })
        })
    })
    it('updateArticleVote updates the vote count up or down by 1 for a given article ID', () => {
      const articleId = docs.articles[0]._id
      return request
        .put(`/api/articles/${articleId}?vote=up`)
        .expect(201)
        .then(res => {
          expect(res.text).to.equal(`Thanks for your vote on Comment ${articleId}`)
        })
    })
    it('updateArticleVote responds with a 400 HTTP response if the query parameters are not in the format "?vote=up" or "?vote=down"', () => {
      const articleId = docs.articles[0]._id
      return request
        .put(`/api/articles/${articleId}?vote=dow`)
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({ "message": "Please provide a query in the format vote=up or vote=down" })
        })
    })
  });

  describe('/users API endpoints', () => {
    it('getUser returns the details of the requested user', () => {
      const user = docs.user.username
      return request
        .get(`/api/users/${user}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.username).to.equal('northcoder')
          expect(res.body.user.name).to.equal('Awesome Northcoder')
          expect(res.body.user.avatar_url).to.equal('https://avatars3.githubusercontent.com/u/6791502?v=3&s=200')
        })
    })
    it('getUser responds with a 400 HTTP response when provided with a invalid username', () => {
      return request
        .get('/api/users/invalidUser')
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({ "message": 'Username does not exist, please ensure the username is valid' })
        })
    })
  })
});