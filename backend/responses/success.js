function authorized(response) {
    response.writeHead(200, 'Authorized');
    response.end('Authorized');
}

module.exports.authorized = authorized;