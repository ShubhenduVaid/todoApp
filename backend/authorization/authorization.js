const { unauthorized } = require('./../responses/error');
const { authorized } = require('./../responses/success');
const { userCredentialsModel } = require('./../mongo/mongo');
const { signUpUser } = require('./../mongo/mongo');
const { successMessage } = require('./../responses/success');

function login(request, response, next) {
  if (request.method === 'POST') {
    let authHeader = request.headers.authorization;
    if (!authHeader) {
      unauthorized(response);
      return;
    }
    let auth = authHeader.split(' ')[1];
    auth = new Buffer(auth, 'base64').toString().split(':');
    let user = auth[0];
    let passwd = auth[1];
    if (user === 'shubhendu' && passwd === 'vaid') {
      authorized(response);
      // next();
    } else {
      unauthorized(response);
    }
  }
}

function signUp(request, response, next) {
  if (request.method === 'POST' && request.body) {
    console.log(`
    User Set =>
    Username : ${request.body.username}
    Password : ${request.body.password}
    `);
    signUpUser(request.body, (error, status) => {
      if (error) {
        next(error);
      } else {
        if (status) {
          successMessage(response, 'User Already Exist');
        } else {
          successMessage(response, 'User Added Successfully');
        }
      }
    });
  } else {
    next();
  }
}

module.exports.login = login;
module.exports.signUp = signUp;