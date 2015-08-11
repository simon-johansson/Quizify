'use strict';

var socket = require('socket.io-client')();
var events = require('shared/socketEvents');

var HostActions = require('actions/HostActionCreators');
var {wrapper} = require('./utils');

var outgoing = () => {
  let ev = events.toServer.fromHost;
  HostActions.createGame.listen(() => socket.emit(ev.createGame));
  HostActions.requestNewRound.listen(() => socket.emit(ev.requestNewRound));
  HostActions.listPlayers.listen(data => socket.emit(ev.listPlayers, data));
};

var incoming = () => {
  let ev = events.fromServer.toHost;
  socket.on(ev.gameCreated, data => wrapper(HostActions.createGame, data));
  socket.on(ev.playerJoined, HostActions.playerJoinGame);
};

module.exports = {
  bind() {
    outgoing();
    incoming();
  },
  unbind() {}
};
