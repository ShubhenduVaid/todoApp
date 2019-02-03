let connect = require('connect');
const { login } = require('./authorization/authorization');
let app = connect();
const port = 3000;

app
	.use('/login', login)
	.listen(port);
console.log(`Server listening on port ${port}.`);