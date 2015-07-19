'use strict';

var socketIO = require('socket.io');
var socketEvents = require('../../../shared/socketEvents');
var io;

function onHostCreateLobby () {
  let lobbyId = `${Math.floor(Math.random() * 100000)}`;
  if(io.nsps['/'].adapter.rooms[lobbyId]) {
    return onHostCreateLobby();
  }
  this.join(lobbyId);
  // console.log(`new lobby created with ID: ${lobbyId}`);
  this.emit(socketEvents.server.lobbyCreated, { lobbyId });
}

 /**
  * @param  {{lobbyId: string, playerName: string}} data
  */
function onPlayerJoinLobby (data) {
  let {lobbyId, playerName} = data;
  let playerId = this.id;
  if(io.nsps['/'].adapter.rooms[lobbyId]) {
    this.join(lobbyId);
    // console.log(`New player (${playerName}) joined lobby: ${lobbyId}`);
    io.to(lobbyId).emit(socketEvents.server.playerJoined, { lobbyId, playerName, playerId });
  } else {
    let errorMessage = `Game ${lobbyId} does not exist`;
    var obj = { errorMessage };
    // console.log(`Error: Player attempted to join room (${errorMessage}) that could not be found`);
    this.emit(socketEvents.server.playerJoined, obj);
  }
}

function onClientDisconnect () {
  let playerId = this.id;
  let lobbyId = Object.keys(this.nsp.adapter.rooms)[0];
  if(io.nsps['/'].adapter.rooms[lobbyId]) {
  //   console.log(`Player (${playerName}) disconnected from lobby: ${lobbyId}`);
    io.to(lobbyId).emit(socketEvents.server.clientDisconnected, { playerId });
  }
}

function onListPlayers (data) {
  this.emit(socketEvents.server.listPlayers, data);
}

function bindEvents (socket) {
  socket.on(socketEvents.client.host.createLobby, onHostCreateLobby);
  socket.on(socketEvents.client.host.listPlayers, onListPlayers);
  socket.on(socketEvents.client.player.joinLobby, onPlayerJoinLobby);

  socket.on('disconnect', onClientDisconnect);
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', bindEvents);
  },
  _getSocket() {
    return io;
  }
};
