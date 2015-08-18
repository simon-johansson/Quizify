'use strict';

const socket = require('socket.io-client')();
const events = require('shared/socketEvents');

const PlayerActions = require('actions/PlayerActionCreators');
const {wrapper} = require('./utils');

const bouncing = () => {
  let ev = events.toServer.fromPlayer;

  PlayerActions.joinGame.listen((playerName, gameId) => {
    socket.emit(
      ev.joinGame,
      {playerName, gameId},
      data => wrapper(PlayerActions.joinGame, data)
    );
  });
};

const outgoing = () => {
};

const incoming = () => {
  let ev = events.fromServer.toPlayer;

  socket.on(ev.listPlayers, PlayerActions.listPlayers);
};

module.exports = {
  bind() {
    bouncing();
    outgoing();
    incoming();
  },
  unbind() {}
};
