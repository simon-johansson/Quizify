'use strict';

var socket = require('socket.io-client')();
var socketEvents = require('../../common/socketEvents');

var WebSocketService = {
  connect() {
    socket.on('connect', () => {
      console.log('Connected with WebSockets');
    });
  },

  createLobby() {
    return new Promise ((resolve, reject) => {
      socket.on(socketEvents.server.lobbyCreated, function (data) {
        resolve(data);
        // reject('Failed!');
      });
      socket.emit(socketEvents.client.host.createLobby);
    });
  },
};

module.exports = WebSocketService;
