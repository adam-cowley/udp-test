const SERVER_PORT = 3333
const SERVER_HOST = '127.0.0.1'
const SOCKET_TYPE = 'udp4'

const EVENT_JOINED = 'JOINED'
const EVENT_LEFT = 'LEFT'
const EVENT_READY =  'READY'
const EVENT_QUEUE = 'QUEUE'
const EVENT_PLAY = 'PLAY'

send:send

function send(client, text, port = SERVER_PORT, host = SERVER_HOST) {
    const message = new Buffer(text);

    return new Promise(resolve => {
        client.send(message, 0, message.length, port, host, (err, bytes) => {
            if (err) throw err;

            console.log('Sent ', message.toString())

            resolve(bytes);
        })
    })

}

module.exports = {
    SERVER_PORT,
    SERVER_HOST,
    SOCKET_TYPE,

    EVENT_JOINED,
    EVENT_LEFT,
    EVENT_READY,
    EVENT_QUEUE,
    EVENT_PLAY,

    send
}

