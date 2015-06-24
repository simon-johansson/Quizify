'use strict';

let socketIO = require('socket.io');
let socketEvents = require('../../common/socketEvents');
let io;

function bindEvents (socket) {
  socket.on(socketEvents.client.host.createLobby, (data) => {

    // Just a dummy id at the moment
    let lobbyId = Math.floor(Math.random() * 2000);
    console.log(`new lobby created with ID: ${lobbyId}`);
    socket.emit(socketEvents.server.lobbyCreated, { lobbyId });
  });
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', bindEvents);
  }
};
