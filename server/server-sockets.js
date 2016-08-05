const {SERVER_PORT, SERVER_HOST, SOCKET_TYPE} = require('../config');

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket);
    socket.on('event', function(data){
        console.log(data);
    });
    socket.on('disconnect', function(){});
})

server.listen(SERVER_PORT, SERVER_HOST, p => {
    const address = server.address();

    console.log(`server listening ${address.address}:${address.port}`);
});


setInterval(function() {
    console.log('sent message')
    io.emit('hello', {some:'details'});
}, 10000)