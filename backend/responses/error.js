function unauthorized(response) {
  response.writeHead(403, { 'WWW-Authenticate': 'Basic' });
  response.end('Unauthorized');
}

function incorrectRequest(message, next) {
  try {
    throw new Error(message);
  } catch (error) {
    next(error);
  }
}

module.exports.unauthorized = unauthorized;
module.exports.incorrectRequest = incorrectRequest;