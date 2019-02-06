const jwt = require('jsonwebtoken');
const secreatKey = 'sakinaka';
const { unauthorized } = require('./../responses/error');
const { authorized } = require('./../responses/success');
/**
 * Public API
 * @param {*} userObject 
 * @param {*} callback 
 */
function getToken(userObject, callback) {
  jwt.sign(userObject, secreatKey, { expiresIn: 60 }, (error, token) => {
    if (error) {
      callback(error);
    } else {
      callback(undefined, token);
    }
  });
}

function verifyToken(request, response, next) {
  const token = request.headers['authorization'].split(' ')[1];
  jwt.verify(token, secreatKey, (error, authData) => {
    if (error) {
      unauthorized(response);
    } else {
      console.log(authData);
      authorized(response);
    }
  });
}

module.exports.getToken = getToken;
module.exports.verifyToken = verifyToken;