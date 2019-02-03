function unauthorized(response) {
    response.writeHead(401, { 'WWW-Authenticate': 'Basic' });
    response.end('Unauthorized');
}

module.exports.unauthorized = unauthorized;