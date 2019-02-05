const { incorrectRequest } = require('./../responses/error');
const { successMessage } = require('./../responses/success');
const { isUserExist } = require('./../mongo/mongo');
const { getToken } = require('./../jwt/jwt');

/**
 * Public API
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
function login(request, response, next) {
  if (request.method === 'POST' && request.body) {
    doLogin(request, response, next);
  } else {
    incorrectRequest('Request not POST or without body.', next);
  }
}
/**
 * Private API
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
function doLogin(request, response, next) {
  if (request.body.username && request.body.password) {
    console.log(`
    Login User Set =>
    Username : ${request.body.username}
    Password : ${request.body.password}
    `);
    loginUser(request.body, (error, token) => {
      if (error) {
        next(error);
      } else {
        successMessage(response, token);
      }
    });
  } else {
    incorrectRequest('Request body missing username or password.', next);
  }
}
/**
 * Private API
 * @param {*} userObject 
 * @param {*} callback 
 */
function loginUser(userObject, callback) {
  // Check user exists in mongo before making token
  isUserExist(userObject, (error, status) => {
    if (error) {
      callback(error);
    } else {
      if (status) {
        // User exist make token
        makeToken(userObject, callback);
      } else {
        // User not exist
        incorrectRequest('No matching user found.', next);
      }
    }
  });
}
/**
 * Private API
 * @param {*} userObject 
 */
function makeToken(userObject, callback) {
  getToken(userObject, (error, token) => {
    if (error) {
      callback(error);
    } else {
      callback(undefined, token);
    }
  });
}

module.exports.login = login;
