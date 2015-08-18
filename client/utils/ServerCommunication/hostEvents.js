'use strict';

const socket = require('socket.io-client')();
const events = require('shared/socketEvents');

const HostActions = require('actions/HostActionCreators');
const {wrapper} = require('./utils');

const bouncing = () => {
  let ev = events.toServer.fromHost;

  HostActions.createGame.listen(() => {
    socket.emit(
      ev.createGame,
      data => wrapper(HostActions.createGame, data)
    );
  });
};

const outgoing = () => {
  let ev = events.toServer.fromHost;

  HostActions.requestNewRound.listen(() => socket.emit(ev.requestNewRound));
  HostActions.listPlayers.listen(data => socket.emit(ev.listPlayers, data));
};

const incoming = () => {
  let ev = events.fromServer.toHost;

  socket.on(ev.playerJoined, HostActions.playerJoinGame);
};

module.exports = {
  bind() {
    bouncing();
    outgoing();
    incoming();
  },
  unbind() {}
};
