const jwt = require('jsonwebtoken');
const secreatKey = 'sakinaka';

/**
 * Public API
 * @param {*} userObject 
 * @param {*} callback 
 */
function getToken(userObject, callback) {
  jwt.sign(userObject, secreatKey, { expiresIn: 60 * 1000 }, (error, token) => {
    if (error) {
      callback(error);
    } else {
      callback(undefined, token);
    }
  });
}

module.exports.getToken = getToken;