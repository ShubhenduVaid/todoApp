const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let database;
let collection;

function initMongo(callback) {
  mongo.connect(url, (error, client) => {
    if (error) {
      callback(error);
    } else {
      database = client.db('admin');
      collection = database.collection('todo');
      callback(undefined, 'Mongo Started');
    }
  });
}

function signUpUser(userObject, callback) {
  isUserExist(userObject, (error, status) => {
    if (error) {
      callback(error);
    } else {
      if (status) {
        callback(undefined, status);
      } else {
        collection.insertOne(userObject, (error, result) => {
          if (error) {
            callback(error);
          } else {
            callback(undefined, status);
          }
        })
      }
    }
  });
}

function isUserExist(userObject, callback) {
  collection.find(userObject).toArray((error, items) => {
    if (error) {
      callback(error);
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