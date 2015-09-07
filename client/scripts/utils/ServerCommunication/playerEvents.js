'use strict';

const events = require('shared/socketEvents');
const PlayerActions = require('actions/PlayerActionCreators');
const {wrapper} = require('./utils');

const bouncing = (socket) => {
  let ev = events.toServer.fromPlayer;

  PlayerActions.joinGame.listen((playerName, gameId) => {
    socket.emit(
      ev.joinGame,
      {playerName, gameId},
      data => wrapper(PlayerActions.joinGame, data)
    );
  });
};

const outgoing = (socket) => {
};

const incoming = (socket) => {
  let ev = events.fromServer.toPlayer;

  socket.on(ev.listPlayers, PlayerActions.listPlayers);
  socket.on(ev.newRound, data => wrapper(PlayerActions.newRound, data));
};

module.exports = {
  bind(socket) {
    bouncing(socket);
    outgoing(socket);
    incoming(socket);
  },
  unbind() {}
};
