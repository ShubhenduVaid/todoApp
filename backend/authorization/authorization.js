const { unauthorized } = require('./../responses/error');
const { authorized } = require('./../responses/success');

function login(request, response, next) {
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

module.exports.login = login;