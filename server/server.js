const {
    SERVER_PORT,
    SERVER_HOST,
    SOCKET_TYPE,

    EVENT_JOINED,
    EVENT_LEFT,
    EVENT_READY,
    EVENT_QUEUE,
    EVENT_PLAY,

    send
} = require('../config');

const dgram = require('dgram');
const server = dgram.createSocket(SOCKET_TYPE);

const clients = {};

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (buffer, rinfo) => {
    const msg = buffer.toString();
    const recipient = `${rinfo.address}:${rinfo.port}`;

    if ( !clients[ recipient ] ) {
        clients[ recipient ] = rinfo;
    }

    console.log(`${new Date()} [${recipient}]: ${msg} `);


    switch (msg) {
        case EVENT_JOINED:
            //clients[ recipient ] = rinfo;
            break;

        case EVENT_LEFT:
            delete clients[ recipient ];

            break;

    }

});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(SERVER_PORT, SERVER_HOST);


setInterval(function() {
    const msg = new Buffer(EVENT_PLAY);

    Object.keys(clients).forEach(key => {
        const client = clients[ key ];

        send(server, EVENT_PLAY, client.port, client.address)
    })
}, 4000)