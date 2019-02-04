const connect = require('connect');
const bodyParser = require('body-parser');
const { login, signUp } = require('./authorization/authorization');
const { initMongo } = require('./mongo/mongo');
const app = connect();
const port = 3000;

initMongo((error, status) => {
  if (error) {
    console.log(`Error Handled : ${error.message}`);
  } else {
    console.log(status);
  }
});

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/signup', signUp)
  .use('/login', login)
  .use((error, req, res, next) => {
    console.log(`Error Handled : ${error.message}`);
    res.writeHead(500);
    res.end('Server Error');
  })
  .listen(port);

console.log(`Server listening on port ${port}.`);