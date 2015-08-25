'use strict';

var events = require('shared/socketEvents');
var ClientActions = require('actions/ClientActionCreators');
var {wrapper} = require('./utils');

var bouncing = (socket) => {
  let ev = events.toServer.fromClient;

  setInterval(() => {
    let startTime = Date.now();
    socket.emit(ev.ping, () => {
      let latency = Date.now() - startTime;
      ClientActions.latency(latency);
    });
  }, 2000);
};

var outgoing = (socket) => {
  let ev = events.toServer.fromClient;
  ClientActions.leaveGame.listen( (playerName, gameId) => {
    socket.emit(ev.leaveGame, {playerName, gameId});
  });
};

var incoming = (socket) => {
  let ev = events.fromServer.toClient;
  socket.on(ev.leaveGame, data => wrapper(ClientActions.leaveGame, data));
  socket.on(ev.newRound, data => wrapper(ClientActions.startNewRound, data));
};

module.exports = {
  bind(socket) {
    bouncing(socket);
    outgoing(socket);
    incoming(socket);
  },
  unbind() {}
};
