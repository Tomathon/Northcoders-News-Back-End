const app = require('./server');
const PORT = require('./config').PORT[process.env.MONGODB_URI] || process.env.PORT;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});