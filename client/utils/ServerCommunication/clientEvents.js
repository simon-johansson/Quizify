'use strict';

var events = require('shared/socketEvents');
var ClientActions = require('actions/ClientActionCreators');
var {wrapper} = require('./utils');

var outgoing = (socket) => {
  let ev = events.toServer.fromClient;
  ClientActions.leaveGame.listen( (playerName, gameId) => {
    socket.emit(ev.leaveGame, {playerName, gameId});
  });
};

var incoming = (socket) => {
  let ev = events.fromServer.toClient;
  socket.on(ev.leaveGame, data => wrapper(ClientActions.leaveGame, data));
  socket.on(ev.newRound, data => wrapper(ClientActions.newRound, data));
};

module.exports = {
  bind(socket) {
    outgoing(socket);
    incoming(socket);
  },
  unbind() {}
};
