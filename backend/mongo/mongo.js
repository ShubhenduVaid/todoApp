const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let database;
let collection;

function initMongo() {
  mongo.connect(url, (error, client) => {
    if (error) {
      console.log(error);
      return;
    } else {
      database = client.db('admin');
      collection = database.collection('todo');
    }
  });
}

function signUpUser(userObject, callback) {
  isUserExist(userObject, (error, status) => {
    if (error) {
      callback(err);
    } else {
      if (status) {
        callback(undefined, status);
      } else {
        collection.insertOne(userObject, (err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(undefined, status);
          }
        })
      }
    }
  });
}

function isUserExist(userObject, callback) {
  collection.find(userObject).toArray((err, items) => {
    if (err) {
      callback(err);
    } else {
      if (items.length > 0) {
        callback(undefined, true);
      } else {
        callback(undefined, false);
      }
    }
  })
}

module.exports.initMongo = initMongo;
module.exports.signUpUser = signUpUser;