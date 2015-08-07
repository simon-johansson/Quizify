'use strict';

var socketIO = require('socket.io');
var ev = require('../../../shared/socketEvents');
var config = require('../../config/environment');
var io;

var onHostCreateGame = () => {
  let gameId = `${Math.floor(Math.random() * 100000)}`;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    return onHostCreateGame();
  }
  this.join(gameId);
  this.gameId = gameId;
  // console.log(`new game created with ID: ${gameId}`);
  this.emit(ev.fromServer.toHost.gameCreated, { gameId, url: config.url });
}

/**
 * @param  {{gameId: string, playerName: string}} data
 */
var onPlayerJoinGame = (data) => {
  let {gameId, playerName} = data;
  let playerId = this.id;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    this.join(gameId);
    this.gameId = gameId;
    // console.log(`New player (${playerName}) joined game: ${gameId}`);
    var obj = { gameId, playerName, playerId }
    io.to(gameId).emit(ev.fromServer.toHost.playerJoined, obj);
  } else {
    let errorMessage = `Game ${gameId} does not exist`;
    var obj = { errorMessage };
    // console.log(`Error: Player attempted to join room (${errorMessage}) that could not be found`);
  }
  this.emit(ev.fromServer.toPlayer.joinGame, obj);
}

var onClientLeave = () => {
  let clientId = this.id;
  let gameId = this.gameId;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    if(!this.disconnected) {
      this.leave(gameId);
      this.gameId = null;
    }
    // console.log(`Client (${id}) disconnected from game: ${gameId}`);
    io.to(gameId).emit(ev.fromServer.toClient.leaveGame, { clientId });
  }
}

var onListPlayers = (data) => {
  let gameId = this.gameId;
  if(io.nsps['/'].adapter.rooms[gameId]) {
    io.to(gameId).emit(ev.fromServer.toPlayer.listPlayers, data);
  }
}

var bindEvents = (socket) => {
  let {fromHost, fromPlayer, fromClient} = ev.toServer;
  socket.on(fromHost.createGame, onHostCreateGame);
  socket.on(fromHost.listPlayers, onListPlayers);
  socket.on(fromPlayer.joinGame, onPlayerJoinGame);
  socket.on(fromClient.leaveGame, onClientLeave);
  socket.on('disconnect', onClientLeave);
}

module.exports = {
  init(server) {
    io = socketIO(server);
    io.on('connection', (socket) => {
      bindEvents(socket);
    });
  },
  _getSocket() {
    return io;
  }
};
