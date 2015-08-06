'use strict';

var socket = require('socket.io-client')();
var events = require('shared/socketEvents');

var ClientActions = require('actions/ClientActionCreators');
var {wrapper} = require('./utils');

var outgoing = () => {
  let ev = events.toServer.fromClient;
  ClientActions.leaveGame.listen( (playerName, gameId) => {
    socket.emit(ev.leaveGame, {playerName, gameId});
  });
};

var incoming = () => {
  let ev = events.fromServer.toClient;
  socket.on(ev.leaveGame, data => wrapper(ClientActions.leaveGame, data));
};

module.exports = {
  bind() {
    outgoing();
    incoming();
  },
  unbind() {}
};
