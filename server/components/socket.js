'use strict';

var socketIO = require('socket.io');
var socketEvents = require('../../common/socketEvents');
var io;

function bindEvents (socket) {

  socket.on(socketEvents.client.host.createLobby, (data) => {
    // Just a dummy id at the moment
    let lobbyId = Math.floor(Math.random() * 2000);
    console.log(`new lobby created with ID: ${lobbyId}`);
    socket.emit(socketEvents.server.lobbyCreated, { lobbyId });
  });

  socket.on(socketEvents.client.player.joinLobby, (data) => {
    // Just a dummy id at the moment
    let playerId = Math.floor(Math.random() * 2000);
    console.log(data);
    console.log(`new player ${data.playerName} joined lobby: ${data.lobbyId}`);
    io.sockets.emit(socketEvents.server.playerJoined, {
      lobbyId: data.lobbyId,
      playerId: playerId,
      playerName:  data.playerName
    });
  });
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', bindEvents);
  }
};
