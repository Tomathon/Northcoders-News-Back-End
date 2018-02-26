module.exports = {
  DB: {
    test: 'mongodb://localhost/northcoders-news-api-test',
    dev: process.env.MONGODB_URI || 'mongodb://localhost/northcoders-news-api'
  },
  PORT: {
    test: 3090,
    dev: 3000
  }
};
