const { successMessage } = require('./../responses/success');
const { incorrectRequest } = require('./../responses/error');
const { isUserExist, insertSingleUser } = require('./../mongo/mongo');

/**
 * Public API
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
function signup(request, response, next) {
  if (request.method === 'POST' && request.body) {
    doSignup(request, response, next);
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
function doSignup(request, response, next) {
  if (request.body.username && request.body.password) {
    console.log(`
    Signup User Set =>
    Username : ${request.body.username}
    Password : ${request.body.password}
    `);
    signupUser(request.body, (error, status) => {
      if (error) {
        next(error);
      } else {
        const message = status ? 'User Already Exist' : 'User Added Successfully';
        successMessage(response, message);
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
function signupUser(userObject, callback) {
  isUserExist(userObject, (error, status) => {
    if (error) {
      callback(error);
    } else {
      if (status) {
        callback(undefined, status);
      } else {
        insertSingleUser(userObject, callback, status);
      } 
    }
  });
}

module.exports.signup = signup;