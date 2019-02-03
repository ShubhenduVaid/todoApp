const mongoose = require('mongodb');

function initMongo() {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/todo');
}

function userCredentialsSchema() {
  return new mongoose.Schema({
    username: String,
    password: String
  });
}

function userCredentialsModel() {
  return mongoose.model('userCredentials', userCredentialsSchema());
}

module.exports.initMongo = initMongo;
module.exports.userCredentialsModel = userCredentialsModel;