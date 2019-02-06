const { verifyToken } = require('./../jwt/jwt');

function todo(request, response, next) {
    verifyToken(request, response, next);
}
module.exports.todo = todo;