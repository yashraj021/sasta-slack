const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
let namespaces = require('./data/namespaces');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors());

const server = app.listen(9000);

const io = socketio(server);


io.on('connection', socket => {
    const nsData = namespaces.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })

    socket.emit('nsData', nsData);

});

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connection', (nsSocket)=> {
        console.log(`${nsSocket.id}: Connected!`);

        nsSocket.emit('nsRoomLoad', namespaces[0].rooms);
    })
})
