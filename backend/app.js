const connect = require('connect');
const bodyParser = require('body-parser');
const { signup } = require('./authorization/signup');
const { login } = require('./authorization/login');
const { todo } = require('./todo/todo');
const { initMongo } = require('./mongo/mongo');
const app = connect();
const port = 3000;

/**
 * Make connection with mongo
 */
initMongo((error, status) => {
  if (error) {
    console.log(`Error Handled : ${error.message}`);
  } else {
    console.log(status);
  }
});

/**
 * Middlewares with universal error handler
 */
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/signup', signup)
  .use('/login', login)
  .use('/todo', todo)
  .use((error, req, res, next) => {
    console.log(`Error Handled : ${error.message}`);
    res.writeHead(500);
    res.end(`${error.message}`);
  })
  .listen(port);

console.log(`Server listening on port ${port}.`);