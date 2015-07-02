'use strict';

var socket = require('socket.io-client')();
var socketEvents = require('../../common/socketEvents');

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

function bindEvents () {
  HostActions.createLobby.listenAndPromise(createLobby);
  PlayerActions.joinLobby.listen(joinLobby);

  socket.on(socketEvents.server.playerJoined, playerJoined);
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
