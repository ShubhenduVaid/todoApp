const { unauthorized } = require('./../responses/error');
const { authorized } = require('./../responses/success');
const { userCredentialsModel } = require('./../mongo/mongoose');

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
  if (request.method === 'POST') {
    let userData = new userCredentialsModel(request.body);
    console.log(userData);
  }
}

module.exports.login = login;
module.exports.signUp = signUp;