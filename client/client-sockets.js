const {SERVER_PORT, SERVER_HOST, SOCKET_TYPE} = require('../config');

const port = process.argv[2] || 9999;


var connection = require('socket.io')(port)
console.log(connection);
//connection.connect(SERVER_PORT, SERVER_HOST)