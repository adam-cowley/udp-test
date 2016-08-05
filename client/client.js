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
const client = dgram.createSocket(SOCKET_TYPE);

process.stdin.resume();

process.on('SIGINT', (o,e) => {
    send(client, EVENT_LEFT)
        .then(_ => {
            client.close(_ => {
                process.exit(0);
            });
        })
        .catch(e => {
            console.log(':(', e)
        })
})

send(client, EVENT_JOINED);

setTimeout(_ => {send(client, EVENT_READY)}, 100);


client.on('message', (buffer, rinfo) => {
    const msg = buffer.toString();


console.log('received!', msg)
    send(client, 'GOT IT')


});


