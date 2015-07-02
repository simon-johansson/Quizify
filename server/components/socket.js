'use strict';

var socketIO = require('socket.io');
var socketEvents = require('../../common/socketEvents');
var io;

function createLobby () {
  let lobbyId = `${Math.floor(Math.random() * 100000)}`;
  if(io.nsps['/'].adapter.rooms[lobbyId]) {
    return createLobby();
  }
  this.join(lobbyId);
  console.log(`new lobby created with ID: ${lobbyId}`);
  this.emit(socketEvents.server.lobbyCreated, { lobbyId });
}

 /**
  * @param  {{lobbyId: string, playerName: string}} data
  */
function joinLobby (data) {
  let {lobbyId, playerName} = data;
  let playerId = this.id;
  if(io.nsps['/'].adapter.rooms[lobbyId]) {
    this.join(lobbyId);
    console.log(`New player (${playerName}) joined lobby: ${lobbyId}`);
    io.to(lobbyId).emit(socketEvents.server.playerJoined, { lobbyId, playerName, playerId });
  } else {
    let errorMessage = `Game ${lobbyId} does not exist`;
    var obj = { errorMessage };
    console.log(`Error: Player attempted to join room (${errorMessage}) that could not be found`);
    this.emit(socketEvents.server.playerJoined, obj);
  }
}

function bindEvents (socket) {
  socket.on(socketEvents.client.host.createLobby, createLobby);
  socket.on(socketEvents.client.player.joinLobby, joinLobby);
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', bindEvents);
  }
};
