'use strict';

var socketIO = require('socket.io');
var socketEvents = require('../../../shared/socketEvents');
var io;

function onHostCreateGame () {
  let gameId = `${Math.floor(Math.random() * 100000)}`;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    return onHostCreateGame();
  }
  this.join(gameId);
  // console.log(`new game created with ID: ${gameId}`);
  this.emit(socketEvents.server.gameCreated, { gameId });
}

/**
 * @param  {{gameId: string, playerName: string}} data
 */
function onPlayerJoinGame (data) {
  let {gameId, playerName} = data;
  let playerId = this.id;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    this.join(gameId);
    this.gameId = gameId;
    // console.log(`New player (${playerName}) joined game: ${gameId}`);
    io.to(gameId).emit(socketEvents.server.playerJoined, { gameId, playerName, playerId });
  } else {
    let errorMessage = `Game ${gameId} does not exist`;
    var obj = { errorMessage };
    // console.log(`Error: Player attempted to join room (${errorMessage}) that could not be found`);
    this.emit(socketEvents.server.playerJoined, obj);
  }
}

function onClientLeave () {
  let clientId = this.id;
  let gameId = this.gameId;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    if(!this.disconnected) {
      this.leave(gameId);
      this.gameId = null;
    }
    // console.log(`Client (${id}) disconnected from game: ${gameId}`);
    io.to(gameId).emit(socketEvents.server.clientLeft, { clientId });
  }
}

function onListPlayers (data) {
  this.emit(socketEvents.server.listPlayers, data);
}

function bindEvents (socket) {
  socket.on(socketEvents.client.host.createGame, onHostCreateGame);
  socket.on(socketEvents.client.host.listPlayers, onListPlayers);
  socket.on(socketEvents.client.player.joinGame, onPlayerJoinGame);
  socket.on(socketEvents.client.leaveGame, onClientLeave);
  socket.on('disconnect', onClientLeave);
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
