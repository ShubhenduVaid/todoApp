function authorized(response) {
  response.writeHead(200, 'Authorized');
  response.end('Authorized');
}

function successMessage(response, message) {
  response.writeHead(200, message);
  response.end(message);
}

module.exports.authorized = authorized;
module.exports.successMessage = successMessage;