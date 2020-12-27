const http =  require('http');
const app = require('./app');
const config = require('../config/default');

const port = config.server.port || 3000;

const server = http.createServer(app);



server.listen(port);