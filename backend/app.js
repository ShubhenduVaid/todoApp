const connect = require('connect');
const bodyParser = require('body-parser');
const { login, signUp } = require('./authorization/authorization');
const { initMongo } = require('./mongo/mongo');
const app = connect();
const port = 3000;

initMongo();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/signup', signUp)
  .use('/login', login)
  .listen(port);

console.log(`Server listening on port ${port}.`);