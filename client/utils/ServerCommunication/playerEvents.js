'use strict';

var socket = require('socket.io-client')();
var events = require('shared/socketEvents');

var PlayerActions = require('actions/PlayerActionCreators');
var {wrapper} = require('./utils');

var outgoing = () => {
  let ev = events.toServer.fromPlayer;
  PlayerActions.joinGame.listen((playerName, gameId) => {
    socket.emit(ev.joinGame, {playerName, gameId});
  });
};

var incoming = () => {
  let ev = events.fromServer.toPlayer;
  socket.on(ev.joinedGame, data => wrapper(PlayerActions.joinGame, data));
  socket.on(ev.listPlayers, PlayerActions.listPlayers);
};

module.exports = {
  bind() {
    outgoing();
    incoming();
  },
  unbind() {}
};
