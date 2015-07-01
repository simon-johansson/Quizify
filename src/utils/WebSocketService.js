'use strict';

var socket = require('socket.io-client')();
var socketEvents = require('../../common/socketEvents');

var HostActions = require('actions/HostActionCreators');
var PlayerActions = require('actions/PlayerActionCreators');

var WebSocketService = {
  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
    this.onAction();
    this.onSocket();
  },

  onAction() {
    HostActions.createLobby.listenAndPromise( this.createLobby );

    PlayerActions.joinLobby.listen((data) => {
      socket.emit(socketEvents.client.player.joinLobby, data);
    });
  },

  onSocket() {
    socket.on(socketEvents.server.playerJoined, (data) => {
      let {failed, completed} = PlayerActions.joinLobby;
      if(data.error) {failed(data);}
      else {completed(data);}
    });
  },

  createLobby() {
    socket.off(socketEvents.server.lobbyCreated);
    return new Promise ((resolve, reject) => {
      socket.on(socketEvents.server.lobbyCreated, (data) => {
        if(data.error) {reject('Failed!');}
        else {resolve(data);}
      });
      socket.emit(socketEvents.client.host.createLobby);
    });
  },
};

module.exports = WebSocketService;
