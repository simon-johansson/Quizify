'use strict';

var socket = require('socket.io-client')();
var socketEvents = require('shared/socketEvents');

var HostActions = require('actions/HostActionCreators');
var PlayerActions = require('actions/PlayerActionCreators');

function createLobby () {
  socket.off(socketEvents.server.lobbyCreated);
  return new Promise ((resolve, reject) => {
    socket.on(socketEvents.server.lobbyCreated, (data) => {
      return data.errorMessage ? reject('Failed!') : resolve(data);
    });
    socket.emit(socketEvents.client.host.createLobby);
  });
}

function joinLobby (data) {
  socket.emit(socketEvents.client.player.joinLobby, data);
}

function playerJoined (data) {
  let {failed, completed} = PlayerActions.joinLobby;
  return data.errorMessage ? failed(data.errorMessage) : completed(data);
}

function listPlayers (data) {
  console.log(data);
  socket.emit(socketEvents.client.host.listPlayers, data);
}

function playersListed (data) {
  console.log("Players Listed");
  console.log(data);
}

/**
 * @param  {{playerId: string}} data
 */
function clientDisconnected (data) {
  console.log('Client disconnected!');
}

function bindEvents () {
  HostActions.createLobby.listenAndPromise(createLobby);
  HostActions.listPlayers.listen(listPlayers);
  PlayerActions.joinLobby.listen(joinLobby);

  socket.on(socketEvents.server.playerJoined, playerJoined);
  socket.on(socketEvents.server.clientDisconnected, clientDisconnected);
  socket.on(socketEvents.server.listPlayers, playersListed);
}

var WebSocketService = {
  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
    bindEvents();
  }
};

module.exports = WebSocketService;
